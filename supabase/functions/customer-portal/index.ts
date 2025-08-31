
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CUSTOMER-PORTAL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Validate environment variables
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!stripeKey) {
      logStep("ERROR: STRIPE_SECRET_KEY not found");
      throw new Error("Stripe configuration missing. Please check your environment variables.");
    }
    if (!supabaseUrl || !serviceRoleKey) {
      logStep("ERROR: Supabase environment variables missing");
      throw new Error("Supabase configuration missing. Please check your environment variables.");
    }
    logStep("Environment variables validated");

    const supabaseClient = createClient(
      supabaseUrl,
      serviceRoleKey,
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("ERROR: No authorization header");
      throw new Error("Authentication required. Please sign in and try again.");
    }
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      logStep("Authentication error", { error: userError.message });
      throw new Error(`Authentication failed: ${userError.message}`);
    }
    const user = userData.user;
    if (!user?.email) {
      logStep("ERROR: User not authenticated or no email");
      throw new Error("User authentication failed. Please sign in again.");
    }
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Look for existing customer
    logStep("Looking for Stripe customer", { email: user.email });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;

    if (customers.data.length === 0) {
      logStep("No existing customer found, creating new customer");
      
      // Create a new Stripe customer
      try {
        const newCustomer = await stripe.customers.create({
          email: user.email,
          metadata: {
            supabase_user_id: user.id,
          },
        });
        customerId = newCustomer.id;
        logStep("Created new Stripe customer", { customerId });
      } catch (createError) {
        logStep("ERROR: Failed to create Stripe customer", { error: createError.message });
        throw new Error("Failed to create customer account. Please try again.");
      }
    } else {
      customerId = customers.data[0].id;
      logStep("Found existing Stripe customer", { customerId });
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    // Create the customer portal session
    try {
      logStep("Creating customer portal session", { customerId, returnUrl: `${origin}/pricing` });
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${origin}/pricing`,
      });
      
      logStep("Customer portal session created successfully", { 
        sessionId: portalSession.id, 
        url: portalSession.url 
      });

      return new Response(JSON.stringify({ url: portalSession.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } catch (portalError) {
      logStep("ERROR: Failed to create portal session", { 
        error: portalError.message,
        type: portalError.type,
        code: portalError.code 
      });
      
      // Handle specific Stripe portal errors
      if (portalError.message?.includes("customer portal")) {
        throw new Error("Customer portal is not properly configured. Please contact support.");
      } else if (portalError.message?.includes("customer")) {
        throw new Error("Customer account issue. Please try again or contact support.");
      } else {
        throw new Error(`Portal access failed: ${portalError.message}`);
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in customer-portal", { 
      message: errorMessage, 
      stack: error instanceof Error ? error.stack : undefined 
    });
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: "Unable to access customer portal. Please try again or contact support if the issue persists."
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
