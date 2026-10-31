import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Server-side gate for public lead submissions (quiz result save, newsletter subscribe).
// Direct INSERT/UPDATE/DELETE on the underlying tables is revoked at the database level;
// this function is the only write path and inserts with the service role after checks.
//
// Protection layers (each honest about what it is):
// - Turnstile token verification (when configured) - the actual bot challenge.
//   FAILS CLOSED: if TURNSTILE_SECRET_KEY is not set, submissions are rejected.
// - Honeypot field - naive-bot filter, not a security control.
// - Atomic per-IP-hour throttle via the throttle_hit() RPC (single upsert, fail closed on error).
//   IP comes from the platform-provided forwarding header and is stored SHA-256 hashed only.
//   Throttling is best-effort abuse damping, not proof of identity.
// - Strict shape validation and normalization; quiz results are recomputed server-side
//   from the submitted answers - client-supplied results are never stored.

const ALLOWED_ORIGINS = ["https://www.foundstart.org", "https://foundstart.org"];
const corsHeaders = (origin: string | null) => ({
  ...(origin && ALLOWED_ORIGINS.includes(origin) ? { "Access-Control-Allow-Origin": origin } : {}),
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LANGS = ["en", "ar"] as const;
const SOURCES = ["footer", "quiz"] as const;
const COUNTRIES = ["USA", "UK", "Estonia", "Finland", "Sweden", "Latvia", "Lithuania", "Ireland", "Egypt"] as const;
const MAX_PER_IP_PER_HOUR = 10;
const MAX_BODY_BYTES = 8192;

// Question weights, mirroring src/pages/Quiz.tsx exactly. Per-question option counts: 4,3,3,4,3.
const QUESTION_WEIGHTS: Record<string, number>[][] = [
  [{ USA: 3 }, { Estonia: 2, Ireland: 2, Finland: 1, Sweden: 1, Latvia: 1, Lithuania: 1 }, { Egypt: 3 }, { USA: 2, UK: 2, Ireland: 2 }],
  [{ Estonia: 3, UK: 2, Finland: 2, Lithuania: 1 }, { UK: 2, USA: 1, Estonia: 1, Ireland: 1 }, { Egypt: 2, Sweden: 1, Latvia: 1 }],
  [{ Egypt: 3 }, { USA: 2, UK: 2, Ireland: 2, Estonia: 1 }, { Estonia: 1, Finland: 1, Latvia: 1, Lithuania: 1, Sweden: 1 }],
  [{ USA: 3, UK: 1 }, { Estonia: 2, Ireland: 2, Finland: 1, Sweden: 1, Latvia: 1, Lithuania: 1 }, { Egypt: 3 }, { Estonia: 2, UK: 2, USA: 1 }],
  [{ UK: 2, Estonia: 2, Lithuania: 1 }, { USA: 1, Finland: 1, Sweden: 1, Latvia: 1, Ireland: 1 }, { Egypt: 2 }],
];
const QUESTION_OPTION_COUNTS = [4, 3, 3, 4, 3];

const computeResults = (answers: number[]): string[] => {
  const score = new Map<string, number>();
  answers.forEach((a, q) => {
    for (const [country, w] of Object.entries(QUESTION_WEIGHTS[q][a] ?? {})) {
      score.set(country, (score.get(country) ?? 0) + w);
    }
  });
  return [...score.entries()].sort((x, y) => y[1] - x[1]).slice(0, 3).map(([c]) => c);
};

const hmacSha256 = async (secret: string, text: string): Promise<string> => {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const buf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
};

const ok = (body: unknown, status = 200, origin: string | null = null) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } });

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(origin) });
  if (req.method !== "POST") return ok({ error: "method not allowed" }, 405, origin);

  // Body size cap BEFORE allocating the full body: Content-Length precheck, then a streamed
  // read with a hard byte cutoff (chunked clients can lie about length).
  const declared = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return ok({ error: "payload too large" }, 413, origin);
  let raw = "";
  if (req.body) {
    const reader = req.body.getReader();
    const decoder = new TextDecoder();
    let received = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > MAX_BODY_BYTES) {
        try { await reader.cancel(); } catch { /* ignore */ }
        return ok({ error: "payload too large" }, 413, origin);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  }
  if (raw.length > MAX_BODY_BYTES) return ok({ error: "payload too large" }, 413, origin);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return ok({ error: "invalid payload" }, 400, origin);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return ok({ error: "invalid payload" }, 400, origin);

  // Honeypot: naive bots that fill the hidden field get a fake success; nothing is stored.
  if (typeof body.website === "string" && body.website.length > 0) return ok({ ok: true }, 200, origin);

  const kind = body.kind;
  if (kind !== "quiz" && kind !== "newsletter") return ok({ error: "invalid kind" }, 400, origin);

  // Turnstile verification (the real challenge). Fail closed when not configured.
  const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!turnstileSecret) return ok({ error: "service not configured" }, 500, origin);
  const token = typeof body.turnstile_token === "string" ? body.turnstile_token : "";
  if (!token || token.length > 2048) return ok({ error: "challenge required" }, 400, origin);

  // Throttling identity comes from the x-forwarded-for header. Every entry in that header is
  // client-influenced and no platform-appended entry is guaranteed here, so this throttle is
  // best-effort abuse damping only - NOT a trusted security boundary. The actual bot challenge
  // is the Turnstile verification above; the throttle just damps repeat traffic per presented
  // header value.
  const fwdEntries = (req.headers.get("x-forwarded-for") ?? "").split(",").map((x) => x.trim()).filter(Boolean);
  const clientIp = fwdEntries[fwdEntries.length - 1] ?? "unknown";

  const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: turnstileSecret, response: token, remoteip: clientIp }),
  }).catch(() => null);
  if (!verify) return ok({ error: "challenge unavailable" }, 502, origin);
  const verdict = await verify.json().catch(() => null) as { success?: boolean; hostname?: string; action?: string } | null;
  if (!verdict?.success) return ok({ error: "challenge failed" }, 400, origin);
  // Validate the challenge was solved on our site, for the expected form action.
  // Production hostnames only. Non-production environments can extend this via
  // TURNSTILE_EXTRA_HOSTS (comma-separated), which stays unset in production.
  const EXPECTED_HOSTS = ["www.foundstart.org", "foundstart.org",
    ...(Deno.env.get("TURNSTILE_EXTRA_HOSTS") ?? "").split(",").map((h) => h.trim()).filter(Boolean)];
  const expectedAction = kind === "quiz" ? "quiz-lead" : "newsletter-subscribe";
  if (!verdict.hostname || !EXPECTED_HOSTS.includes(verdict.hostname)) return ok({ error: "challenge failed" }, 400, origin);
  if (verdict.action !== expectedAction) return ok({ error: "challenge failed" }, 400, origin);

  // Atomic fail-closed throttle on an HMAC of the IP keyed by a server-only secret
  // (no fixed public salt; fail closed when the secret is not configured).
  const throttleSecret = Deno.env.get("THROTTLE_HMAC_SECRET");
  if (!throttleSecret) return ok({ error: "service not configured" }, 500, origin);
  const ipHash = await hmacSha256(throttleSecret, clientIp);
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: allowed, error: throttleError } = await admin.rpc("throttle_hit", {
    p_ip_hash: ipHash, p_kind: kind, p_max: MAX_PER_IP_PER_HOUR,
  });
  if (throttleError) return ok({ error: "could not process" }, 500, origin);
  if (allowed !== true) return ok({ error: "rate limited" }, 429, origin);

  if (kind === "newsletter") {
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const language = LANGS.includes(body.language as typeof LANGS[number]) ? body.language as string : "en";
    const source = SOURCES.includes(body.source as typeof SOURCES[number]) ? body.source as string : "footer";
    if (!EMAIL_RE.test(email) || email.length > 254) return ok({ error: "invalid email" }, 400, origin);
    const { error } = await admin.from("newsletter_subscribers").insert({ email, language, source });
    if (error && error.code !== "23505") return ok({ error: "could not save" }, 500, origin);
    return ok({ ok: true }, 200, origin);
  }

  // kind === "quiz"
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const language = LANGS.includes(body.language as typeof LANGS[number]) ? body.language as string : "en";
  if (name.length < 1 || name.length > 120) return ok({ error: "invalid name" }, 400, origin);
  if (!EMAIL_RE.test(email) || email.length > 254) return ok({ error: "invalid email" }, 400, origin);

  const answers = body.answers;
  if (
    !Array.isArray(answers) || answers.length !== 5 ||
    !answers.every((a, i) => Number.isInteger(a) && (a as number) >= 0 && (a as number) < QUESTION_OPTION_COUNTS[i])
  ) return ok({ error: "invalid answers" }, 400, origin);

  const { error } = await admin.from("quiz_leads").insert({
    name, email, language,
    answers: answers as number[],
    result_countries: computeResults(answers as number[]),
  });
  if (error) return ok({ error: "could not save" }, 500, origin);
  return ok({ ok: true }, 200, origin);
};

Deno.serve(handler);
