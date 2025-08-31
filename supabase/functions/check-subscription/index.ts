
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    logStep("Stripe initialized with secret key");

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, updating unsubscribed state");
      await supabaseClient.from("subscribers").upsert({
        email: user.email,
        user_id: user.id,
        stripe_customer_id: null,
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Check for all subscriptions (active, canceled, past_due, etc.)
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 10, // Get more subscriptions to find the most recent one
    });

    let hasActiveSub = false;
    let subscriptionTier = null;
    let subscriptionEnd = null;
    let mostRecentSub = null;

    if (subscriptions.data.length > 0) {
      // Find the most recent subscription (sorted by created date)
      mostRecentSub = subscriptions.data.sort((a, b) => b.created - a.created)[0];
      const currentTime = Math.floor(Date.now() / 1000);
      
      logStep("Found subscription", { 
        subscriptionId: mostRecentSub.id, 
        status: mostRecentSub.status,
        currentPeriodEnd: mostRecentSub.current_period_end,
        currentTime: currentTime
      });

      // Check if subscription is active OR if it's canceled but still within the paid period
      const isWithinPaidPeriod = mostRecentSub.current_period_end > currentTime;
      const isActiveStatus = ['active', 'trialing'].includes(mostRecentSub.status);
      const isCanceledButStillValid = mostRecentSub.status === 'canceled' && isWithinPaidPeriod;
      
      hasActiveSub = isActiveStatus || isCanceledButStillValid;
      subscriptionEnd = new Date(mostRecentSub.current_period_end * 1000).toISOString();
      
      logStep("Subscription status analysis", { 
        isActiveStatus,
        isCanceledButStillValid,
        isWithinPaidPeriod,
        hasActiveSub,
        endDate: subscriptionEnd
      });
      
      if (hasActiveSub) {
        const priceId = mostRecentSub.items.data[0].price.id;
        logStep("Price ID from subscription", { priceId });
        
        // Determine subscription tier based on your live price IDs
        if (priceId === 'price_1RhVvaP2RGNZXg7rsXQo0PsG') {
          subscriptionTier = "Premium (Yearly)";
        } else if (priceId === 'price_1RhVuHP2RGNZXg7rV5yrur3d') {
          subscriptionTier = "Premium (Monthly)";
        } else {
          subscriptionTier = "Premium";
        }
        
        logStep("Determined subscription tier", { priceId, subscriptionTier });
      } else {
        logStep("Subscription expired or inactive", { 
          status: mostRecentSub.status,
          endTime: subscriptionEnd
        });
      }
    } else {
      logStep("No subscriptions found for customer");
    }

    await supabaseClient.from("subscribers").upsert({
      email: user.email,
      user_id: user.id,
      stripe_customer_id: customerId,
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'email' });

    logStep("Updated database with subscription info", { 
      subscribed: hasActiveSub, 
      subscriptionTier,
      subscriptionEnd 
    });
    
    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
