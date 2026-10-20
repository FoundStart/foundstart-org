// Stripe webhook for FoundStart.
// - kind=formation_order: marks orders paid, advances the company, emails customer + team.
// - otherwise (wallet deposit): marks payment_transactions completed.
// Env: STRIPE_WEBHOOK_SECRET, RESEND_API_KEY (optional), plus SUPABASE_* built-ins.
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });

function api(path: string, init?: RequestInit) {
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation", ...(init?.headers || {}) },
  });
}

async function verifyStripeSignature(raw: string, header: string, secret: string): Promise<boolean> {
  const entries = header.split(",").map((p) => { const i = p.indexOf("="); return [p.slice(0, i), p.slice(i + 1)] as const; });
  const ts = entries.find(([k]) => k === "t")?.[1];
  const sigs = entries.filter(([k]) => k === "v1").map(([, v]) => v);
  if (!ts || !sigs.length) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const expected = [...new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${ts}.${raw}`)))].map((b) => b.toString(16).padStart(2, "0")).join("");
  return sigs.some((s) => {
    if (s.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < s.length; i++) diff |= s.charCodeAt(i) ^ expected.charCodeAt(i);
    return diff === 0;
  });
}

const escapeHtml = (s: unknown): string =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

async function sendEmail(to: string[], subject: string, html: string) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key || !to.length) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "FoundStart <no-reply@foundstart.org>", to, subject, html }),
  }).catch(() => null);
}

async function handleFormationOrder(session: any) {
  const orderId = session?.metadata?.order_id ?? session?.client_reference_id ?? null;
  if (!orderId) return json({ success: true });

  const oRes = await api(`orders?id=eq.${encodeURIComponent(orderId)}&select=id,user_id,company_id,status,total_price,currency,metadata&limit=1`);
  const order = oRes.ok ? (await oRes.json())?.[0] : null;
  if (!order) return json({ error: "unknown order" }, 404);
  if (["paid", "processing", "completed"].includes(order.status)) return json({ success: true, message: "Already processed" }, 200);

  const paidOk = session?.payment_status === "paid"
    && Number(session?.amount_total ?? 0) === Math.round(Number(order.total_price) * 100)
    && String(session?.currency ?? "").toUpperCase() === String(order.currency).toUpperCase();

  await api(`payments?order_id=eq.${order.id}&provider=eq.stripe`, {
    method: "PATCH",
    body: JSON.stringify({ status: paidOk ? "completed" : "failed", metadata: { stripe_session: session.id, paid: paidOk } }),
  });
  if (!paidOk) return json({ success: true });

  await api(`orders?id=eq.${order.id}`, { method: "PATCH", body: JSON.stringify({ status: "paid", updated_at: new Date().toISOString() }) });
  if (order.company_id) {
    await api(`companies?id=eq.${order.company_id}`, { method: "PATCH", body: JSON.stringify({ status: "submitted", updated_at: new Date().toISOString() }) });
  }

  const m = order.metadata ?? {};
  const addons = Array.isArray(m.addons) && m.addons.length ? m.addons.map((a: any) => escapeHtml(a?.name)).join(", ") : "None";
  const customerEmail = session?.customer_details?.email ?? session?.customer_email ?? null;
  const summary = `
    <p><b>Order:</b> ${escapeHtml(order.id)}</p>
    <p><b>Company:</b> ${escapeHtml(m.companyName ?? "")} (${escapeHtml(String(m.entityType ?? "").toUpperCase())})</p>
    <p><b>Country:</b> ${escapeHtml(m.country ?? "")}</p>
    <p><b>Add-ons:</b> ${addons}</p>
    <p><b>Total paid:</b> $${Number(order.total_price).toFixed(2)} ${escapeHtml(order.currency)}</p>`;

  if (customerEmail) {
    await sendEmail([customerEmail], "Payment received - your company formation has started", `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h2 style="color:#0f172a">Thank you - we received your payment</h2>
        <p>Your company formation order is confirmed and our team is starting on it. You can follow every step in your FoundStart dashboard.</p>
        ${summary}
        <p><a href="https://www.foundstart.org/dashboard/companies" style="background:#3b82f6;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">Track my company</a></p>
        <p style="color:#64748b;font-size:13px">Questions? Reply to this email or open a ticket from your dashboard support section.</p>
      </div>`);
  }
  await sendEmail(["momo@foundstart.org"], `New paid formation order - ${escapeHtml(m.companyName ?? "")}`, `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
      <h2>New paid company formation order</h2>
      ${summary}
      <p><b>Customer:</b> ${escapeHtml(customerEmail ?? "unknown")} (user ${escapeHtml(order.user_id)})</p>
      <p><a href="https://www.foundstart.org/admin">Open admin dashboard</a></p>
    </div>`);

  return json({ success: true });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
  const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!secret) return new Response("not configured", { status: 503 });
  const raw = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";
  if (!sig || !(await verifyStripeSignature(raw, sig, secret))) return new Response("bad signature", { status: 401 });

  const evt = JSON.parse(raw);
  if (evt?.type !== "checkout.session.completed") return json({ success: true });

  const session = evt?.data?.object ?? {};
  if (session?.metadata?.kind === "formation_order") return await handleFormationOrder(session);

  // Wallet deposit path (payment_transactions)
  const orderId = session?.client_reference_id ?? session?.metadata?.order_id ?? null;
  if (!orderId) return json({ success: true });

  const txRes = await api(`payment_transactions?order_id=eq.${encodeURIComponent(orderId)}&select=id,status,amount,currency&limit=1`);
  const tx = txRes.ok ? (await txRes.json())?.[0] : null;
  if (!tx) return json({ error: "unknown order" }, 404);
  if (tx.status === "completed") return json({ success: true, message: "Already processed" }, 200);

  const paidOk = session?.payment_status === "paid"
    && Number(session?.amount_total ?? 0) === Math.round(Number(tx.amount) * 100)
    && String(session?.currency ?? "").toUpperCase() === String(tx.currency).toUpperCase();

  await api(`payment_transactions?id=eq.${tx.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: paidOk ? "completed" : "failed",
      webhook_data: evt,
      updated_at: new Date().toISOString(),
    }),
  });
  return json({ success: true });
});
