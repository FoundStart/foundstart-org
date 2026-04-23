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

// HTML-escape user-supplied content to prevent HTML/script injection in admin emails
const escapeHtml = (s: unknown): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Validate and bound input lengths to mitigate abuse via the public endpoint
const validate = (body: InquiryEmailRequest): string | null => {
  if (!body || typeof body !== 'object') return 'Invalid payload';
  if (!body.name || typeof body.name !== 'string' || body.name.length > 200) return 'Invalid name';
  if (!body.email || typeof body.email !== 'string' || body.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return 'Invalid email';
  if (body.phone && (typeof body.phone !== 'string' || body.phone.length > 40)) return 'Invalid phone';
  if (!Array.isArray(body.domains) || body.domains.length === 0 || body.domains.length > 100) return 'Invalid domains';
  if (body.domains.some(d => typeof d !== 'string' || d.length > 253)) return 'Invalid domain entry';
  if (body.message && (typeof body.message !== 'string' || body.message.length > 2000)) return 'Invalid message';
  if (body.inquiryType && body.inquiryType !== 'single' && body.inquiryType !== 'bulk') return 'Invalid inquiry type';
  return null;
};

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

    const body: InquiryEmailRequest = await req.json();
    const validationError = validate(body);
    if (validationError) {
      return new Response(
        JSON.stringify({ error: 'Invalid request' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resend = new Resend(resendApiKey);
    const { inquiryType, name, email, phone, domains, message } = body;

    const isBulk = inquiryType === 'bulk' || domains.length > 1;

    // Escape all user-supplied values before injecting into HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : '';
    const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br>') : '';
    const safeDomains = domains.map(d => escapeHtml(d));
    // For href values, also strip anything outside expected character set
    const emailHref = encodeURIComponent(email);
    const phoneDigits = (phone || '').replace(/\D/g, '').slice(0, 20) || '21002905764';

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
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email:</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${emailHref}" style="color: #3b82f6; text-decoration: none;">${safeEmail}</a>
                </td>
              </tr>
              ${safePhone ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Phone:</td>
                <td style="padding: 8px 0;">
                  <a href="tel:${encodeURIComponent(phone || '')}" style="color: #3b82f6; text-decoration: none;">${safePhone}</a>
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
              ${safeDomains.map(d => `<div style="padding: 4px 0; color: #3b82f6; font-weight: 600;">• ${d}</div>`).join('')}
            </div>
          </div>

          ${safeMessage ? `
          <div style="margin-bottom: 24px;">
            <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 16px 0;">Message</h2>
            <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; color: #475569; line-height: 1.6;">
              ${safeMessage}
            </div>
          </div>
          ` : ''}

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
            <div style="display: flex; gap: 12px;">
              <a href="mailto:${emailHref}" style="background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                Reply via Email
              </a>
              <a href="https://wa.me/${phoneDigits}" style="background: #22c55e; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
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

    const subjectName = safeName.slice(0, 100);
    const emailResponse = await resend.emails.send({
      from: "FoundStart <onboarding@resend.dev>",
      to: ["momo@foundstart.org"],
      subject: isBulk
        ? `[Bulk Inquiry] ${domains.length} domains from ${subjectName}`
        : `[Domain Inquiry] ${safeDomains[0]} from ${subjectName}`,
      html: emailHtml,
    });

    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending inquiry notification:", error);
    return new Response(
      JSON.stringify({ error: "Unable to send notification. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
