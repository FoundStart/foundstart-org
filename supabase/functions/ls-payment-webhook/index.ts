// Lemon Squeezy webhook for FoundStart: marks payment_transactions completed on paid orders.
// Env: LS_WEBHOOK_SECRET, plus SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (built-ins).
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });

async function hmacHex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function api(path: string, init?: RequestInit) {
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation", ...(init?.headers || {}) },
  });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
  const secret = Deno.env.get("LS_WEBHOOK_SECRET");
  if (!secret) return new Response("not configured", { status: 503 });
  const raw = await req.text();
  const sig = req.headers.get("x-signature") ?? "";
  if (!sig || (await hmacHex(secret, raw)) !== sig.toLowerCase()) return new Response("bad signature", { status: 401 });

  const evt = JSON.parse(raw);
  if (evt?.meta?.event_name !== "order_created") return json({ success: true });

  const attrs = evt?.data?.attributes ?? {};
  const orderId = evt?.meta?.custom_data?.order_id ?? attrs?.custom_data?.order_id ?? null;
  if (!orderId) return json({ success: true });

  const txRes = await api(`payment_transactions?order_id=eq.${encodeURIComponent(orderId)}&select=id,status,amount,currency&limit=1`);
  const tx = txRes.ok ? (await txRes.json())?.[0] : null;
  if (!tx) return json({ error: "unknown order" }, 404);
  if (tx.status === "completed") return json({ success: true, message: "Already processed" }, 200);

  const paidOk = attrs?.status === "paid"
    && Number(attrs?.total ?? 0) === Math.round(Number(tx.amount) * 100)
    && String(attrs?.currency ?? "").toUpperCase() === String(tx.currency).toUpperCase();

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
