// Stripe webhook for FoundStart: marks payment_transactions completed on paid Checkout Sessions.
// Env: STRIPE_WEBHOOK_SECRET, plus SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (built-ins).
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
