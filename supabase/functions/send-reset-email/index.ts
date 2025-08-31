import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ResetEmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: ResetEmailRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    console.log(`Processing password reset request for: ${email}`);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Generate secure reset token
    const resetToken = globalThis.crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Store the reset token in the database (don't worry about user verification)
    const { error: tokenError } = await supabase
      .from('password_reset_tokens')
      .insert({
        user_id: globalThis.crypto.randomUUID(), // temporary user_id
        email: email,
        token: resetToken,
        expires_at: expiresAt.toISOString(),
      });

    if (tokenError) {
      console.error('Error storing reset token:', tokenError);
      return new Response(
        JSON.stringify({ error: 'Failed to process reset request' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Generate reset link
    const resetLink = `${Deno.env.get('SITE_URL') || 'https://7aa7d730-fbd5-4490-9405-60d1f8f71045.lovableproject.com'}/forgot-password?token=${resetToken}`;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Webfluin <viktor@webfluin.com>",
      to: [email],
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Reset Your Password</h1>
          <p style="color: #666; font-size: 16px;">
            You requested to reset your password. Click the button below to set a new password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #999; font-size: 14px;">
            If you didn't request this password reset, you can safely ignore this email.
          </p>
          <p style="color: #999; font-size: 14px;">
            This link will expire in 1 hour for security reasons.
          </p>
        </div>
      `,
    });

    console.log("Password reset email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-reset-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);