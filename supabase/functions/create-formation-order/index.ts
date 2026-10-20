// Create a company-formation order and open Stripe Checkout for it.
// Prices are server-side constants - the client never sets amounts.
// Env: STRIPE_SECRET_KEY, SITE_URL (optional), plus SUPABASE_* built-ins.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

// Provisional formation prices (USD), pending owner confirmation per country.
const COUNTRIES: Record<string, { name: string; base: number }> = {
  usa: { name: "United States", base: 299 },
  uk: { name: "United Kingdom", base: 199 },
  ca: { name: "Canada", base: 399 },
  ee: { name: "Estonia", base: 300 },
  fi: { name: "Finland", base: 350 },
  se: { name: "Sweden", base: 350 },
  lv: { name: "Latvia", base: 250 },
  lt: { name: "Lithuania", base: 280 },
  ie: { name: "Ireland", base: 350 },
};
const ADDONS: Record<string, { name: string; price: number }> = {
  registered_agent: { name: "Registered Agent", price: 149 },
  virtual_office: { name: "Virtual Office", price: 199 },
  ein: { name: "EIN Registration", price: 99 },
  bank_assist: { name: "Bank Account Assistance", price: 249 },
  operating_agreement: { name: "Operating Agreement", price: 79 },
};

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

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeKey) return json({ error: "card payments not configured" }, 503);

  let body: {
    country?: string; entityType?: string; companyName?: string;
    businessAddress?: string; businessDescription?: string;
    owners?: { name?: string; email?: string; ownership?: string }[];
    addons?: string[];
  };
  try { body = await req.json(); } catch { return json({ error: "invalid payload" }, 400); }

  const country = (body?.country ?? "").toLowerCase();
  const cdef = COUNTRIES[country];
  if (!cdef) return json({ error: "unknown country" }, 400);
  const entityType = (body?.entityType ?? "").trim().slice(0, 40);
  const companyName = (body?.companyName ?? "").trim();
  if (!entityType) return json({ error: "entity type required" }, 400);
  if (companyName.length < 2 || companyName.length > 120) return json({ error: "company name required" }, 400);
  const addons = Array.isArray(body?.addons) ? body!.addons!.filter((a) => ADDONS[a]) : [];
  const owners = Array.isArray(body?.owners)
    ? body!.owners!.slice(0, 10).map((o) => ({ name: String(o?.name ?? "").slice(0, 100), email: String(o?.email ?? "").slice(0, 255), ownership: String(o?.ownership ?? "").slice(0, 10) }))
    : [];

  const addonsTotal = addons.reduce((s, a) => s + ADDONS[a].price, 0);
  const total = cdef.base + addonsTotal;

  const u = await fetch(`${Deno.env.get("SUPABASE_URL")}/auth/v1/user`, {
    headers: { apikey: Deno.env.get("SUPABASE_ANON_KEY") ?? auth.slice(7), Authorization: auth },
  });
  if (!u.ok) return json({ error: "invalid session" }, 401);
  const user = await u.json();

  // 1) Company draft
  const cIns = await api("companies", {
    method: "POST",
    body: JSON.stringify([{
      user_id: user.id,
      company_name: companyName,
      jurisdiction: cdef.name,
      company_type: entityType,
      status: "draft",
    }]),
  });
  if (!cIns.ok) return json({ error: "could not create company draft" }, 500);
  const company = (await cIns.json())?.[0];

  // 2) Order
  const oIns = await api("orders", {
    method: "POST",
    body: JSON.stringify([{
      user_id: user.id,
      order_type: "company_formation",
      company_id: company.id,
      status: "pending",
      total_price: total,
      currency: "USD",
      metadata: {
        country, entityType, companyName,
        businessAddress: String(body?.businessAddress ?? "").slice(0, 500),
        businessDescription: String(body?.businessDescription ?? "").slice(0, 1000),
        owners,
        addons: addons.map((a) => ({ id: a, name: ADDONS[a].name, price: ADDONS[a].price })),
        basePrice: cdef.base,
      },
    }]),
  });
  if (!oIns.ok) return json({ error: "could not create order" }, 500);
  const order = (await oIns.json())?.[0];

  // 3) Stripe Checkout Session
  const site = Deno.env.get("SITE_URL") ?? "https://www.foundstart.org";
  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("success_url", `${site}/dashboard/companies?order=success`);
  form.set("cancel_url", `${site}/dashboard/formation?order=cancelled`);
  if (user.email) form.set("customer_email", user.email);
  form.set("client_reference_id", order.id);
  form.set("metadata[kind]", "formation_order");
  form.set("metadata[order_id]", order.id);
  form.set("metadata[company_id]", company.id);
  form.set("metadata[user_id]", user.id);
  form.set("line_items[0][quantity]", "1");
  form.set("line_items[0][price_data][currency]", "usd");
  form.set("line_items[0][price_data][unit_amount]", String(Math.round(total * 100)));
  form.set("line_items[0][price_data][product_data][name]", `Company formation - ${cdef.name} (${entityType.toUpperCase()})`);
  if (addons.length) {
    form.set("line_items[0][price_data][product_data][description]", `Includes: ${addons.map((a) => ADDONS[a].name).join(", ")}`);
  }

  const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${stripeKey}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  const j = await r.json().catch(() => null);
  const url = j?.url;
  if (!r.ok || !url) return json({ error: "Payment processing failed. Please try again or contact support." }, 502);

  // 4) Payment record linked to the session
  await api("payments", {
    method: "POST",
    body: JSON.stringify([{
      user_id: user.id,
      order_id: order.id,
      provider: "stripe",
      provider_transaction_id: j.id,
      amount: total,
      currency: "USD",
      status: "pending",
      metadata: { checkout_url: url },
    }]),
  });

  return json({ success: true, orderId: order.id, companyId: company.id, paymentUrl: url, total });
});
