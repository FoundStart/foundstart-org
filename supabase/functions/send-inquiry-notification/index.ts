import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryEmailRequest {
  inquiryType: 'single' | 'bulk';
  name: string;
  email: string;
  phone?: string;
  domains: string[];
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured - skipping email notification");
      return new Response(
        JSON.stringify({ success: true, message: "Email notifications not configured" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resend = new Resend(resendApiKey);
    const { inquiryType, name, email, phone, domains, message }: InquiryEmailRequest = await req.json();

    const domainsList = domains.map(d => `• ${d}`).join('\n');
    const isBulk = inquiryType === 'bulk' || domains.length > 1;

    const emailHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">
            ${isBulk ? '📦 Bulk Domain Inquiry' : '🌐 New Domain Inquiry'}
          </h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="margin-bottom: 24px;">
            <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 16px 0;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email:</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Phone:</td>
                <td style="padding: 8px 0;">
                  <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="margin-bottom: 24px;">
            <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 16px 0;">
              ${domains.length > 1 ? `Domains (${domains.length})` : 'Domain'}
            </h2>
            <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; font-family: monospace;">
              ${domains.map(d => `<div style="padding: 4px 0; color: #3b82f6; font-weight: 600;">• ${d}</div>`).join('')}
            </div>
          </div>

          ${message ? `
          <div style="margin-bottom: 24px;">
            <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 16px 0;">Message</h2>
            <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; color: #475569; line-height: 1.6;">
              ${message}
            </div>
          </div>
          ` : ''}

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
            <div style="display: flex; gap: 12px;">
              <a href="mailto:${email}" style="background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                Reply via Email
              </a>
              <a href="https://wa.me/${phone?.replace(/\D/g, '') || '21002905764'}" style="background: #22c55e; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                Reply via WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
          FoundStart Domain Marketplace
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "FoundStart <onboarding@resend.dev>",
      to: ["momo@foundstart.org"],
      subject: isBulk 
        ? `[Bulk Inquiry] ${domains.length} domains from ${name}` 
        : `[Domain Inquiry] ${domains[0]} from ${name}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending inquiry notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
