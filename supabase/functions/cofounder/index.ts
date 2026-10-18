import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CatalogEntry {
  name: string;
  category: string;
  url: string;
  niche?: string;
  language?: string;
  source: string;
}

const catalog: CatalogEntry[] = JSON.parse(
  await Deno.readTextFile(new URL("./catalog.json", import.meta.url))
);
const playbooks: Record<string, { title: string; steps: string[] }> = JSON.parse(
  await Deno.readTextFile(new URL("./playbooks.json", import.meta.url))
);

const STOPWORDS = new Set([
  "the","a","an","and","or","to","of","in","for","on","with","how","i","my","me","is","are","do",
  "want","need","can","you","it","this","that","what","your","we","our","من","في","على","الي","الى",
  "انا","عايز","عاوز","ازاي","كيف","what","with","عن","ده","دي","انا","علي","إيه","ايه"
]);

function scorePartner(p: CatalogEntry, terms: string[]): number {
  const hay = `${p.name} ${p.category} ${p.niche ?? ""} ${p.language ?? ""}`.toLowerCase();
  let s = 0;
  for (const t of terms) if (t.length > 2 && hay.includes(t)) s += t.length > 5 ? 2 : 1;
  return s;
}

function retrievePartners(query: string, limit = 12): CatalogEntry[] {
  const terms = query.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((t) => t && !STOPWORDS.has(t));
  if (!terms.length) return [];
  return catalog
    .map((p) => ({ p, s: scorePartner(p, terms) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.p);
}

function detectPlaybooks(query: string): string[] {
  const q = query.toLowerCase();
  const hits: string[] = [];
  const map: Record<string, string[]> = {
    formation: ["company", "llc", "formation", "register", "incorporat", "شركة", "تأسيس", "سجل"],
    "no-code": ["no-code", "nocode", "vibe cod", "app", "mvp", "build", "برمج", "تطبيق", "موقع", "ابليكيشن"],
    "fly-hermes": ["travel", "flight", "hotel", "سياحة", "سفر", "طيران", "فنادق", "fly hermes"],
    freelance: ["freelance", "freelancer", "khamsat", "خمسات", "مستقل", "فريلانس", "earn"],
    "vibe-marketing": ["marketing", "تسويق", "ads", "اعلان", "إعلان", "social", "فيديو"],
    "ai-operations": ["automate", "automation", "workflow", "اتومات", "اوتمت", "تنظيم", "ادارة", "إدارة"],
  };
  for (const [key, words] of Object.entries(map)) {
    if (words.some((w) => q.includes(w))) hits.push(key);
  }
  return hits.slice(0, 2);
}

function buildSystemPrompt(partners: CatalogEntry[], playbookKeys: string[], language: string): string {
  const partnerLines = partners
    .map((p) => `- ${p.name} (${p.category}${p.niche ? ", " + p.niche : ""}): ${p.url}`)
    .join("\n");
  const playbookText = playbookKeys
    .map((k) => {
      const pb = playbooks[k];
      return pb ? `### ${pb.title}\n${pb.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}` : "";
    })
    .filter(Boolean)
    .join("\n\n");

  return `You are the FoundStart AI Co-founder - a practical co-founder for entrepreneurs, freelancers and builders, with deep knowledge of company formation, AI tools, vibe coding, AI marketing and online work.

Rules:
- Reply in the SAME language the user writes in (Arabic -> Egyptian-friendly Modern Arabic, English -> English). Default language hint: ${language}.
- Be concrete and practical: numbered steps, specific tool names, realistic order of actions.
- Teach first. FoundStart is a free guidance platform: everything you recommend is free to read and start.
- When you recommend a tool or platform, ONLY recommend partners from the catalog below and ALWAYS include their exact URL from the catalog. Never invent URLs.
- Never mention commissions, affiliate arrangements, or that links are monetized.
- Keep answers focused; use short sections and numbered lists.

Relevant partners from the FoundStart catalog (recommend only from this list):
${partnerLines || "(no specific partners matched - give general guidance and ask a clarifying question)"}

${playbookText ? `Relevant playbooks to draw steps from:\n${playbookText}` : ""}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Sign in required" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { thread_id, kind, title, messages, language } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);

    // Resolve or create the thread (route-addressed: ongoing vs project)
    let threadId: string = thread_id ?? "";
    if (!threadId) {
      const threadKind = kind === "ongoing" ? "ongoing" : "project";
      if (threadKind === "ongoing") {
        const { data: existing } = await admin
          .from("cofounder_threads")
          .select("id")
          .eq("user_id", user.id)
          .eq("kind", "ongoing")
          .maybeSingle();
        if (existing) threadId = existing.id;
      }
      if (!threadId) {
        const { data: created, error: tErr } = await admin
          .from("cofounder_threads")
          .insert({ user_id: user.id, kind: threadKind, title: title ?? "New venture" })
          .select("id")
          .single();
        if (tErr) throw tErr;
        threadId = created.id;
      }
    }

    const lastUser = [...messages].reverse().find((m: any) => m.role === "user");
    const lastUserText: string = (lastUser?.content ?? "").toString();
    const partners = retrievePartners(lastUserText);
    const playbookKeys = detectPlaybooks(lastUserText);
    const systemPrompt = buildSystemPrompt(partners, playbookKeys, language ?? "en");

    // Persist the user message before generating
    if (lastUser) {
      await admin.from("cofounder_messages").upsert(
        {
          thread_id: threadId,
          user_id: user.id,
          sdk_id: lastUser.id ?? crypto.randomUUID(),
          message: { role: "user", content: lastUserText },
        },
        { onConflict: "thread_id,sdk_id" }
      );
    }

    const GEMINI_MODELS = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-3.7-flash", "gemini-3.6-flash", "gemini-3-flash-preview"];
    const gemUrl = (m: string) =>
      `https://generativelanguage.googleapis.com/v1beta/models/${m}:streamGenerateContent?alt=sse&key=${Deno.env.get("GEMINI_API_KEY")}`;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    const apiKey = LOVABLE_API_KEY || OPENAI_API_KEY || GEMINI_API_KEY;
    if (!apiKey) throw new Error("No AI gateway key configured (LOVABLE_API_KEY, OPENAI_API_KEY or GEMINI_API_KEY)");
    const gatewayUrl = LOVABLE_API_KEY
      ? "https://ai.gateway.lovable.dev/v1/chat/completions"
      : OPENAI_API_KEY
        ? "https://api.openai.com/v1/chat/completions"
        : gemUrl(GEMINI_MODELS[0]);

    const reqInit: RequestInit = {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(
        GEMINI_API_KEY && !LOVABLE_API_KEY && !OPENAI_API_KEY
          ? {
              system_instruction: { parts: [{ text: systemPrompt }] },
              contents: messages.map((m: any) => ({
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: m.content?.toString() ?? "" }],
              })),
            }
          : {
              model: LOVABLE_API_KEY ? "google/gemini-2.5-flash" : "gpt-4o-mini",
              messages: [
                { role: "system", content: systemPrompt },
                ...messages.map((m: any) => ({ role: m.role, content: m.content?.toString() ?? "" })),
              ],
              stream: true,
            }
      ),
    };
    let response = await fetch(gatewayUrl, reqInit);
    if (!response.ok && GEMINI_API_KEY && !LOVABLE_API_KEY && !OPENAI_API_KEY) {
      for (const m of GEMINI_MODELS.slice(1)) {
        response = await fetch(gemUrl(m), reqInit);
        if (response.ok) break;
      }
    }

    if (!response.ok) {
      const status = response.status;
      const msg = status === 429 ? "Rate limit exceeded. Please try again later."
        : status === 402 ? "AI credits exhausted." : "AI service unavailable";
      return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Stream through while buffering the assistant reply for persistence.
    // Normalize any upstream format to OpenAI-style SSE deltas for the client.
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let assistantText = "";
    let sseBuffer = "";
    const stream = new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        if (done) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          try {
            await admin.from("cofounder_messages").insert({
              thread_id: threadId,
              user_id: user.id,
              sdk_id: crypto.randomUUID(),
              message: { role: "assistant", content: assistantText },
            });
            await admin.from("cofounder_threads").update({ updated_at: new Date().toISOString() }).eq("id", threadId);
          } catch (e) {
            console.error("persist error", e);
          }
          return;
        }
        sseBuffer += decoder.decode(value, { stream: true });
        const lines = sseBuffer.split("\n");
        sseBuffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:") || line.includes("[DONE]")) continue;
          try {
            const json = JSON.parse(line.slice(5).trim());
            const delta = json.choices?.[0]?.delta?.content
              ?? json.candidates?.[0]?.content?.parts?.map((p: any) => p.text ?? "").join("");
            if (delta) {
              assistantText += delta;
              controller.enqueue(encoder.encode(
                `data: ${JSON.stringify({ choices: [{ delta: { content: delta } }] })}\n\n`
              ));
            }
          } catch { /* partial JSON line */ }
        }
      },
      cancel() { reader.cancel(); },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "X-Cofounder-Thread-Id": threadId,
      },
    });
  } catch (e) {
    console.error("cofounder error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
