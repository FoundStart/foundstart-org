import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import knowledge from "./knowledge.json" with { type: "json" };

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const DAILY_LIMIT = 15;
const MODELS = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.6-flash"];
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const token = (req.headers.get("Authorization") || "").replace("Bearer ", "");
    const { data: u } = await admin.auth.getUser(token);
    if (!u?.user) return json({ error: "auth_required" }, 401);
    const uid = u.user.id;

    const body = await req.json();
    const lang = body.language === "ar" ? "ar" : "en";
    const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-8)
      .map((m: any) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: String(m.content || "").slice(0, 600) }] }))
      .filter((m: any) => m.parts[0].text.trim());
    if (!msgs.length || msgs[msgs.length - 1].role !== "user") return json({ error: "bad_request" }, 400);

    const { data: row } = await admin.from("helper_usage").select("count").eq("user_id", uid).eq("day", new Date().toISOString().slice(0, 10)).maybeSingle();
    const used = row?.count ?? 0;
    if (used >= DAILY_LIMIT) return json({ error: "limit", limit: DAILY_LIMIT }, 429);

    const system = `You are the FoundStart Formation Helper. FoundStart helps people open a company abroad online (10 countries: US, UK, Canada, Estonia, Finland, Sweden, Latvia, Lithuania, Ireland, Egypt).
Rules:
- Answer ONLY from the KNOWLEDGE below. If the answer is not there, say you are not sure and point to the FAQ page (/faq) or the Contact page. Never invent prices, fees, timelines, laws or guarantees.
- Prices are FoundStart service fees in USD from the knowledge. There are no add-ons. Never mention or recommend other companies or partners.
- This is general information, not legal or tax advice. Say so briefly when the question is about tax or law.
- Keep answers short (under 120 words). Reply in ${lang === "ar" ? "Arabic" : "English"}.
KNOWLEDGE (JSON):
${JSON.stringify(knowledge)}`;

    const key = Deno.env.get("GEMINI_API_KEY");
    if (!key) return json({ error: "not_configured" }, 503);
    let reply = "";
    let lastErr = "";
    for (const m of MODELS) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: msgs, generationConfig: { temperature: 0.2, maxOutputTokens: 2048 } }),
      });
      if (!r.ok) { lastErr += `${m}:${r.status} `; continue; }
      const d = await r.json();
      reply = d?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") || "";
      if (reply) break;
    }
    if (!reply) return json({ error: "ai_unavailable", detail: lastErr }, 502);

    await admin.from("helper_usage").upsert({ user_id: uid, day: new Date().toISOString().slice(0, 10), count: used + 1 });
    return json({ reply, remaining: DAILY_LIMIT - used - 1 });
  } catch (e) {
    return json({ error: "server", detail: String(e).slice(0, 200) }, 500);
  }
});
