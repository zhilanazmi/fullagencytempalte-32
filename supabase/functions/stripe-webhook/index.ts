import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

// Verify webhook signature
async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigElements = signature.split(",");
    let timestamp = "";
    let v1Signature = "";

    for (const element of sigElements) {
      const [key, value] = element.split("=");
      if (key === "t") timestamp = value;
      if (key === "v1") v1Signature = value;
    }

    const payloadForSigning = `${timestamp}.${payload}`;
    const expectedSignature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(payloadForSigning)
    );

    const expectedSignatureHex = Array.from(new Uint8Array(expectedSignature))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    return expectedSignatureHex === v1Signature;
  } catch (error) {
    logStep("Signature verification failed", { error: error.message });
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    logStep("Webhook received");

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("Missing stripe-signature header");
    }

    const payload = await req.text();
    logStep("Payload received", { payloadLength: payload.length });

    // Verify webhook signature
    const isValid = await verifyWebhookSignature(payload, signature, webhookSecret);
    if (!isValid) {
      throw new Error("Invalid webhook signature");
    }
    logStep("Webhook signature verified");

    const event = JSON.parse(payload);
    logStep("Processing event", { type: event.type, id: event.id });

    // Initialize Supabase client with service role key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Handle different event types
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        logStep("Processing subscription event", { 
          subscriptionId: subscription.id, 
          status: subscription.status,
          customerId 
        });

        // Determine if subscription is active
        const isActive = subscription.status === "active";
        const subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();

        // Determine subscription tier based on price
        let subscriptionTier = "Premium"; // Default
        if (subscription.items?.data?.[0]?.price?.unit_amount) {
          const amount = subscription.items.data[0].price.unit_amount;
          if (amount <= 999) {
            subscriptionTier = "Basic";
          } else if (amount <= 1999) {
            subscriptionTier = "Premium";
          } else {
            subscriptionTier = "Enterprise";
          }
        }

        // Update subscriber record
        const { error: updateError } = await supabaseClient
          .from("subscribers")
          .update({
            subscribed: isActive,
            subscription_tier: isActive ? subscriptionTier : null,
            subscription_end: isActive ? subscriptionEnd : null,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);

        if (updateError) {
          logStep("Error updating subscriber", { error: updateError });
          throw updateError;
        }

        logStep("Subscriber updated successfully", { 
          customerId, 
          subscribed: isActive, 
          subscriptionTier: isActive ? subscriptionTier : null 
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        logStep("Processing subscription deletion", { 
          subscriptionId: subscription.id, 
          customerId 
        });

        // Update subscriber to inactive
        const { error: updateError } = await supabaseClient
          .from("subscribers")
          .update({
            subscribed: false,
            subscription_tier: null,
            subscription_end: null,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);

        if (updateError) {
          logStep("Error updating subscriber for deletion", { error: updateError });
          throw updateError;
        }

        logStep("Subscriber deactivated successfully", { customerId });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId = invoice.customer;
        
        logStep("Processing payment failure", { 
          invoiceId: invoice.id, 
          customerId 
        });

        // Optionally handle failed payments
        // For now, we'll just log it as Stripe will handle retries
        logStep("Payment failed - no action taken", { customerId });
        break;
      }

      default:
        logStep("Unhandled event type", { type: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("Webhook processing error", { error: errorMessage });
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});