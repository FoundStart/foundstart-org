// Lemon Squeezy checkout for FoundStart payments (international card option alongside Kashier).
// Env: LS_API_KEY, LS_STORE_ID, LS_VARIANT_GENERAL (a pay-what-you-want variant), SITE_URL (optional).
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

function api(path: string, init?: RequestInit) {
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation", ...(init?.headers || {}) },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
  const auth = req.headers.get("Authorization");
  if (!auth) return json({ error: "sign in required" }, 401);

  const apiKey = Deno.env.get("LS_API_KEY");
  const storeId = Deno.env.get("LS_STORE_ID");
  const variantId = Deno.env.get("LS_VARIANT_GENERAL");
  if (!apiKey || !storeId || !variantId) return json({ error: "card payments not configured" }, 503);

  let body: { amount?: number; currency?: string; customer?: { name?: string; email?: string }; planId?: string };
  try { body = await req.json(); } catch { return json({ error: "invalid payload" }, 400); }
  const amount = Number(body?.amount);
  const currency = (body?.currency || "USD").toUpperCase();
  if (!Number.isFinite(amount) || amount <= 0 || amount > 100000) return json({ error: "invalid amount" }, 400);
  if (currency !== "USD") return json({ error: "USD only for card checkout" }, 400);

  const u = await fetch(`${Deno.env.get("SUPABASE_URL")}/auth/v1/user`, {
    headers: { apikey: Deno.env.get("SUPABASE_ANON_KEY") ?? auth.slice(7), Authorization: auth },
  });
  if (!u.ok) return json({ error: "invalid session" }, 401);
  const user = await u.json();

  const orderId = `FS-LS-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  const txIns = await api("payment_transactions", {
    method: "POST",
    body: JSON.stringify([{
      order_id: orderId,
      user_id: user.id,
      amount,
      currency,
      status: "pending",
      payment_method: "lemonsqueezy",
      customer_data: body?.customer ?? { email: user.email },
      plan_id: body?.planId ?? null,
    }]),
  });
  if (!txIns.ok) return json({ error: "Unable to create payment. Please try again or contact support." }, 500);
  const tx = (await txIns.json())?.[0];

  const site = Deno.env.get("SITE_URL") ?? "https://www.foundstart.org";
  const r = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/vnd.api+json", "Content-Type": "application/vnd.api+json" },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          custom_price: Math.round(amount * 100),
          checkout_data: {
            email: body?.customer?.email || user.email,
            name: body?.customer?.name || undefined,
            custom: { order_id: orderId, user_id: user.id },
          },
          product_options: {
            redirect_url: `${site}/dashboard`,
            receipt_link_url: `${site}/dashboard`,
            receipt_thank_you_note: "Your payment is being confirmed automatically.",
          },
        },
        relationships: {
          store: { data: { type: "stores", id: storeId } },
          variant: { data: { type: "variants", id: variantId } },
        },
      },
    }),
  });
  const j = await r.json().catch(() => null);
  const url = j?.data?.attributes?.url;
  if (!r.ok || !url) return json({ error: "Payment processing failed. Please try again or contact support." }, 502);

  await api(`payment_transactions?id=eq.${tx.id}`, { method: "PATCH", body: JSON.stringify({ payment_url: url }) });
  return json({ success: true, orderId, paymentUrl: url, transaction: tx });
});
