// Affiliate / referral program UI shared by FoundStart, HeyKeyword and Namelizer.
// Each site passes an adapter (supabase client, language, auth, layout). All data goes through
// SECURITY DEFINER RPCs (aff_*) in that site's own Supabase project. Nothing is paid automatically.
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Copy, Check, Play, ExternalLink, ShieldAlert, Link2, MousePointerClick, UserPlus, DollarSign, Wallet, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productVideos, PRODUCT_LABELS, type ProductVideo, type VideoProduct } from "./affiliateVideos";

export type Lang = "en" | "ar";
export interface AffAdapter {
  supabase: any;
  site: { key: "foundstart" | "heykeyword" | "namelizer"; name: string; url: string; product: VideoProduct; paths: { en: string; ar: string; path: string }[]; whatTheySell: { en: string; ar: string } };
  lang: Lang;
  user: { id: string; email?: string | null } | null;
  authLoading: boolean;
  goSignIn: () => void;
  emailSignIn?: (email: string) => Promise<void>;
  Layout: (p: { children: ReactNode }) => JSX.Element;
}

const LS = "aff_ref";
const money = (c: number, cur = "USD") => new Intl.NumberFormat("en-US", { style: "currency", currency: cur }).format((c || 0) / 100);
const dt = (s: string) => (s ? new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-");
const T = (lang: Lang) => (en: string, ar: string) => (lang === "ar" ? ar : en);

/* ---------- tracking: capture ?ref=, count the click, claim after sign-in ---------- */
export function AffiliateTracker({ supabase, userId }: { supabase: any; userId: string | null }) {
  const loc = useLocation();
  const claiming = useRef(false);
  useEffect(() => {
    const code = new URLSearchParams(loc.search).get("ref");
    if (!code || !/^[a-z0-9]{4,20}$/i.test(code)) return;
    (async () => {
      try {
        if (sessionStorage.getItem("aff_seen") === code.toLowerCase()) return;
        sessionStorage.setItem("aff_seen", code.toLowerCase());
        let days = 30;
        const { data: s } = await supabase.from("aff_settings").select("cookie_days,enabled").eq("id", 1).maybeSingle();
        if (s && s.enabled === false) return;
        if (s?.cookie_days) days = s.cookie_days;
        const { data: ok } = await supabase.rpc("aff_track", { p_code: code, p_path: loc.pathname, p_referrer: document.referrer || null });
        if (ok) localStorage.setItem(LS, JSON.stringify({ code: code.toLowerCase(), exp: Date.now() + days * 864e5 }));
      } catch { /* tracking must never break the site */ }
    })();
  }, [loc.search, loc.pathname, supabase]);
  useEffect(() => {
    if (!userId || claiming.current) return;
    let stored: any = null;
    try { stored = JSON.parse(localStorage.getItem(LS) || "null"); } catch { /* ignore */ }
    if (!stored?.code) return;
    if (stored.exp && stored.exp < Date.now()) { localStorage.removeItem(LS); return; }
    claiming.current = true;
    supabase.rpc("aff_claim", { p_code: stored.code }).then(({ data, error }: any) => {
      if (!error && data && data !== "unauthenticated") localStorage.removeItem(LS);
    }).finally(() => { claiming.current = false; });
  }, [userId, supabase]);
  return null;
}

/* ---------- videos ---------- */
export function VideoCard({ v, lang }: { v: ProductVideo; lang: Lang }) {
  const [on, setOn] = useState(false);
  const [done, setDone] = useState(false);
  const link = `https://youtu.be/${v.id}`;
  const t = T(lang);
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col" dir={v.lang === "ar" ? "rtl" : "ltr"}>
      <div className="relative aspect-video bg-muted">
        {on ? (
          <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={v.title} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
        ) : (
          <button type="button" onClick={() => setOn(true)} className="absolute inset-0 group" aria-label={`Play: ${v.title}`}>
            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" className="w-full h-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30"><span className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center"><Play className="w-5 h-5 ms-0.5" /></span></span>
            {v.format === "short" && <span className="absolute top-2 end-2 text-[10px] font-semibold bg-black/70 text-white rounded px-1.5 py-0.5">Short</span>}
          </button>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col gap-2">
        <div className="text-sm font-medium leading-snug line-clamp-2" title={v.title}>{v.title}</div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-auto">
          <Badge variant="secondary">{PRODUCT_LABELS[v.product]}</Badge>
          <span>{v.lang === "ar" ? "العربية" : "English"}</span>
          <button type="button" className="ms-auto inline-flex items-center gap-1 hover:text-foreground" onClick={() => { navigator.clipboard?.writeText(link); setDone(true); setTimeout(() => setDone(false), 1500); }}>
            {done ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}{done ? t("Copied", "تم النسخ") : t("Copy link", "نسخ الرابط")}
          </button>
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground" aria-label="YouTube"><ExternalLink className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}

export function ProductVideoSection({ product, lang, title, limit }: { product: VideoProduct; lang: Lang; title?: string; limit?: number }) {
  const t = T(lang);
  const list = useMemo(() => productVideos.filter((v) => v.product === product && v.lang === lang), [product, lang]);
  const shown = limit ? list.slice(0, limit) : list;
  if (!list.length) return null;
  return (
    <section className="max-w-6xl mx-auto px-4 py-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      <h2 className="text-2xl font-bold mb-1">{title || t("Videos", "فيديوهات")}</h2>
      <p className="text-sm text-muted-foreground mb-5">{t("Short videos about the product, hosted on YouTube.", "فيديوهات قصيرة عن المنتج على يوتيوب.")}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{shown.map((v) => <VideoCard key={v.id} v={v} lang={lang} />)}</div>
    </section>
  );
}

function MediaKit({ a, code }: { a: AffAdapter; code: string }) {
  const t = T(a.lang);
  const [prod, setProd] = useState<VideoProduct | "all">(a.site.product);
  const [vl, setVl] = useState<Lang | "all">(a.lang);
  const [fmt, setFmt] = useState<"all" | "video" | "short">("all");
  const [max, setMax] = useState(18);
  const list = productVideos.filter((v) => (prod === "all" || v.product === prod) && (vl === "all" || v.lang === vl) && (fmt === "all" || v.format === fmt));
  const prods: (VideoProduct | "all")[] = ["all", "foundstart", "heykeyword", "namelizer", "cartgy", "shortet", "other"];
  const chip = (on: boolean) => `px-3 py-1.5 rounded-full border text-xs font-medium ${on ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-muted"}`;
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{t(`Videos you can share in your own posts and channels. Copy the link, or open it on YouTube. Always share your own referral link next to the video: ${a.site.url}/?ref=${code}`, `فيديوهات تقدر تشاركها في بوستاتك وقنواتك. انسخ الرابط أو افتحه على يوتيوب. شارك رابط الإحالة الخاص بيك مع الفيديو: ${a.site.url}/?ref=${code}`)}</p>
      <div className="flex flex-wrap gap-2">{prods.map((p) => <button key={p} className={chip(prod === p)} onClick={() => { setProd(p); setMax(18); }}>{p === "all" ? t("All platforms", "كل المنصات") : PRODUCT_LABELS[p]}</button>)}</div>
      <div className="flex flex-wrap gap-2">
        {(["all", "en", "ar"] as const).map((l) => <button key={l} className={chip(vl === l)} onClick={() => setVl(l)}>{l === "all" ? t("Both languages", "اللغتين") : l === "en" ? "English" : "العربية"}</button>)}
        {(["all", "video", "short"] as const).map((f) => <button key={f} className={chip(fmt === f)} onClick={() => setFmt(f)}>{f === "all" ? t("All formats", "كل الأنواع") : f === "video" ? t("Videos", "فيديوهات") : "Shorts"}</button>)}
      </div>
      {list.length === 0 ? <p className="text-sm text-muted-foreground">{t("No videos for this filter yet.", "لا توجد فيديوهات لهذا الفلتر حاليا.")}</p> : (
        <>
          <div className="text-xs text-muted-foreground">{list.length} {t("videos", "فيديو")}</div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.slice(0, max).map((v) => <VideoCard key={v.id} v={v} lang={a.lang} />)}</div>
          {list.length > max && <div className="text-center"><Button variant="outline" onClick={() => setMax(max + 18)}>{t("Show more", "عرض المزيد")}</Button></div>}
        </>
      )}
    </div>
  );
}

/* ---------- shared bits ---------- */
function CopyField({ value, lang }: { value: string; lang: Lang }) {
  const [ok, setOk] = useState(false);
  const t = T(lang);
  return (
    <div className="flex gap-2 items-center" dir="ltr">
      <Input readOnly value={value} className="font-mono text-xs" onFocus={(e) => e.currentTarget.select()} />
      <Button type="button" variant="outline" size="sm" onClick={() => { navigator.clipboard?.writeText(value); setOk(true); setTimeout(() => setOk(false), 1500); }}>
        {ok ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}<span className="ms-1.5">{ok ? t("Copied", "تم") : t("Copy", "نسخ")}</span>
      </Button>
    </div>
  );
}
function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string | number }) {
  return (
    <Card><CardContent className="p-4 flex items-center gap-3"><div className="w-9 h-9 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">{icon}</div><div className="min-w-0"><div className="text-xs text-muted-foreground truncate">{label}</div><div className="text-lg font-semibold truncate">{value}</div></div></CardContent></Card>
  );
}
const statusColor: Record<string, string> = { pending: "bg-amber-500/15 text-amber-600", approved: "bg-emerald-500/15 text-emerald-600", paid: "bg-sky-500/15 text-sky-600", void: "bg-muted text-muted-foreground", rejected: "bg-red-500/15 text-red-600", suspended: "bg-red-500/15 text-red-600", requested: "bg-amber-500/15 text-amber-600" };
const StatusPill = ({ s }: { s: string }) => <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[s] || "bg-muted"}`}>{s}</span>;
const METHOD_LABEL: Record<string, [string, string]> = { paypal: ["PayPal", "PayPal"], bank_transfer: ["Bank transfer", "تحويل بنكي"], payoneer: ["Payoneer", "Payoneer"], instapay: ["InstaPay (Egypt)", "إنستا باي (مصر)"], mobile_wallet_egypt: ["Mobile wallet (Egypt)", "محفظة موبايل (مصر)"] };
const mlabel = (m: string, lang: Lang) => (METHOD_LABEL[m] || [m, m])[lang === "ar" ? 1 : 0];
const errMsg = (e: any, t: (a: string, b: string) => string) => {
  const m = String(e?.message || e || "");
  const map: Record<string, [string, string]> = {
    below_minimum: ["Your approved balance is below the minimum payout.", "رصيدك المعتمد أقل من الحد الأدنى للسحب."],
    payout_method_missing: ["Add a payout method and details first.", "أضف طريقة الدفع وبياناتها أولا."],
    payout_open: ["You already have an open payout request.", "عندك طلب سحب مفتوح بالفعل."],
    not_approved: ["Your affiliate account is not approved yet.", "حساب الأفلييت لم تتم الموافقة عليه بعد."],
    bad_code_format: ["Use 3 to 24 letters, numbers, dash or underscore.", "استخدم من 3 إلى 24 حرف أو رقم أو - أو _."],
    code_reserved: ["That name is not allowed. Pick another.", "الاسم ده غير مسموح. اختار غيره."],
    code_taken: ["That name is already taken.", "الاسم ده مستخدم بالفعل."],
    code_changes_limit: ["You reached the limit of link changes.", "وصلت للحد الأقصى لتغيير الرابط."],
    program_closed: ["The program is closed for new affiliates right now.", "البرنامج مغلق للمسجلين الجدد حاليا."],
  };
  for (const k of Object.keys(map)) if (m.includes(k)) return t(...map[k]);
  return t("Something went wrong. Please try again.", "حصل خطأ. حاول مرة تانية.");
};

/* ---------- terms ---------- */
export function TermsBody({ a, s }: { a: AffAdapter; s: any }) {
  const t = T(a.lang);
  const rate = s ? Number(s.default_rate) : 0;
  const days = s?.cookie_days ?? 30;
  const min = s ? money(s.min_payout_cents, s.currency) : "";
  const hold = s?.hold_days ?? 14;
  const months = s?.commission_months ?? 12;
  const n = a.site.name;
  const prov = s?.provisional;
  const items: [string, string, string, string][] = [
    ["Eligibility", "الأهلية", `Anyone 18 or older can apply with a ${n} account. We review each application and can decline or remove an affiliate at any time.`, `أي شخص عمره 18 سنة أو أكثر يقدر يتقدم بحساب على ${n}. بنراجع كل طلب وممكن نرفض أو نوقف أي أفلييت في أي وقت.`],
    ["How referrals are tracked", "طريقة تتبع الإحالات", `Your link is ${a.site.url}/?ref=YOUR_CODE. When someone opens it, your code is remembered in their browser for ${days} days. If they create a new account in that window, they are linked to you. The last referral link a person used before signing up counts. Only new accounts count.`, `رابطك هو ${a.site.url}/?ref=كودك. لما حد يفتحه، كودك بيتحفظ في متصفحه لمدة ${days} يوم. لو عمل حساب جديد خلال المدة يتربط بيك. آخر رابط إحالة استخدمه قبل التسجيل هو اللي يتحسب. الحسابات الجديدة فقط تتحسب.`],
    ["Commission", "العمولة", `You earn ${rate}% of the amount a referred customer actually pays on their purchases during the first ${months} months after they sign up. Rates can differ per affiliate and are set by us. ${prov ? "These terms are provisional and may change before the program is final. Changes do not reduce commission you already earned." : ""}`, `بتكسب ${rate}% من المبلغ اللي العميل المُحال بيدفعه فعلا على مشترياته خلال أول ${months} شهر من تسجيله. النسبة ممكن تختلف من أفلييت لآخر ونحن اللي نحددها. ${prov ? "الشروط دي مبدئية وممكن تتغير قبل اعتماد البرنامج. التغييرات لا تقلل عمولة اتكسبت بالفعل." : ""}`],
    ["Approval, refunds and chargebacks", "الموافقة والاسترداد", `New commission stays pending for ${hold} days. After that we can approve it. If the customer is refunded or disputes the payment, the matching commission is reversed in full or in proportion. If a reversal happens after you were paid, it is deducted from your next payout.`, `العمولة الجديدة بتفضل معلقة ${hold} يوم. بعدها ممكن نعتمدها. لو العميل استرد فلوسه أو فتح نزاع على الدفع، العمولة المقابلة بتتلغي كليا أو بنسبة الاسترداد. لو الإلغاء حصل بعد ما اتدفعلك، بيتخصم من سحبك التالي.`],
    ["Payouts", "السحب", `You request a payout from your dashboard once your approved balance reaches ${min}. Every payout is reviewed and sent manually by us. Nothing is paid automatically. Payout methods: ${(s?.payout_methods || []).map((m: string) => mlabel(m, "en")).join(", ")}. You are responsible for any taxes on your earnings.`, `بتطلب السحب من لوحتك لما رصيدك المعتمد يوصل ${min}. كل طلب سحب بنراجعه ونحوله يدويا. لا يوجد دفع تلقائي. طرق السحب: ${(s?.payout_methods || []).map((m: string) => mlabel(m, "ar")).join("، ")}. أنت مسؤول عن أي ضرائب على أرباحك.`],
    ["What is not allowed", "الممنوعات", "Referring yourself or accounts you control, fake accounts, spam or unsolicited bulk messages, paid ads on our brand name or domain, misleading claims, and promising specific earnings or results. Referrals that look self-made, share a network with the affiliate, or show abuse are flagged and held for review, and the commission can be cancelled.", "إحالة نفسك أو حسابات تتحكم فيها، حسابات وهمية، السبام والرسائل الجماعية غير المرغوبة، الإعلانات المدفوعة على اسم علامتنا أو دومينها، الادعاءات المضللة، والوعد بأرباح أو نتائج محددة. الإحالات اللي تبان مصطنعة أو من نفس شبكة الأفلييت أو فيها إساءة بتتعلم وتتعلق للمراجعة، وممكن تتلغي العمولة."],
    ["Your content", "محتواك", "Say clearly that you are an affiliate when you share your link. Do not claim earnings you did not make. You may share our public videos and links from the media kit.", "وضح إنك أفلييت لما تشارك رابطك. لا تدّعي أرباحا لم تحققها. مسموح تشارك فيديوهاتنا العامة وروابطنا من الميديا كيت."],
    ["Changes and ending", "التعديل والإنهاء", "We may change these terms or end the program with a notice on this page. You can stop at any time. Commission already approved stays payable unless it came from abuse.", "ممكن نعدل الشروط أو ننهي البرنامج بإعلان في هذه الصفحة. تقدر توقف في أي وقت. العمولة المعتمدة تفضل مستحقة ما لم تكن من إساءة."],
  ];
  return (
    <div className="space-y-5 text-sm leading-relaxed" dir={a.lang === "ar" ? "rtl" : "ltr"}>
      {items.map(([en, ar, ten, tar], i) => (
        <div key={i}><h3 className="font-semibold mb-1">{i + 1}. {t(en, ar)}</h3><p className="text-muted-foreground">{t(ten, tar)}</p></div>
      ))}
    </div>
  );
}

/* ---------- public page + dashboard ---------- */
export function AffiliatesPage({ a, view = "program" }: { a: AffAdapter; view?: "program" | "dashboard" | "terms" }) {
  const t = T(a.lang);
  const [s, setS] = useState<any>(null);
  const [me, setMe] = useState<any>(undefined);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ name: "", site: "", promo: "", method: "", details: "", ok: false, email: "" });
  const [sent, setSent] = useState(false);
  const [newCode, setNewCode] = useState<string | null>(null);
  const [method, setMethod] = useState<{ m: string; d: string } | null>(null);
  const [path, setPath] = useState("/");
  const [isAdm, setIsAdm] = useState(false);
  const [loadErr, setLoadErr] = useState("");
  const [slow, setSlow] = useState(false);
  useEffect(() => { const id = setTimeout(() => setSlow(true), 5000); return () => clearTimeout(id); }, []);
  const seq = useRef(0);
  const load = useCallback(async () => {
    const my = ++seq.current;
    setLoadErr("");
    try {
      const withTimeout = <T,>(p: PromiseLike<T>, ms = 12000) => Promise.race([Promise.resolve(p), new Promise<T>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
      const { data: st } = await withTimeout(a.supabase.from("aff_settings").select("*").eq("id", 1).maybeSingle());
      if (my !== seq.current) return;
      setS(st);
      if (a.user) {
        const { data, error } = await withTimeout(a.supabase.rpc("aff_me"));
        if (my !== seq.current) return;
        if (error) throw error;
        setMe(data ?? null);
        const r = await a.supabase.rpc("aff_is_admin");
        if (my === seq.current) setIsAdm(!!r.data);
      } else { setMe(null); setIsAdm(false); }
    } catch (e: any) {
      if (my !== seq.current) return;
      setMe(null); setLoadErr(String(e?.message || e || "error"));
    }
  }, [a.supabase, a.user?.id]);
  useEffect(() => { if (!a.authLoading) load(); }, [a.authLoading, load]);
  useEffect(() => { document.title = `${t("Affiliate program", "برنامج الأفلييت")} | ${a.site.name}`; }, [a.lang]);
  const aff = me?.affiliate;
  useEffect(() => { if (aff && !method) setMethod({ m: aff.payout_method || "", d: aff.payout_details || "" }); }, [aff]);

  const dir = a.lang === "ar" ? "rtl" : "ltr";
  const link = aff ? `${a.site.url}/?ref=${aff.code}` : "";
  const join = async () => {
    setBusy(true); setMsg("");
    const { error } = await a.supabase.rpc("aff_join", { p_display: form.name, p_website: form.site, p_promo: form.promo, p_method: form.method, p_details: form.details });
    setBusy(false);
    if (error) setMsg(errMsg(error, t)); else await load();
  };
  const requestPayout = async () => { setBusy(true); setMsg(""); const { error } = await a.supabase.rpc("aff_request_payout"); setBusy(false); if (error) setMsg(errMsg(error, t)); else { setMsg(t("Payout requested. We review and send it manually.", "تم طلب السحب. هنراجعه ونحوله يدويا.")); load(); } };
  const saveMethod = async () => { if (!method) return; setBusy(true); setMsg(""); const { error } = await a.supabase.rpc("aff_update_payout", { p_method: method.m, p_details: method.d }); setBusy(false); setMsg(error ? errMsg(error, t) : t("Saved.", "تم الحفظ.")); load(); };
  const maxDaily = Math.max(1, ...((me?.daily_clicks as any[]) || []).map((x) => x.n));
  const methods: string[] = s?.payout_methods || [];
  const sel = "w-full h-10 rounded-md border border-input bg-background px-3 text-sm";

  const Hero = (
    <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-5xl mx-auto px-4 py-12 text-center" dir={dir}>
        <h1 className="text-3xl md:text-4xl font-bold">{t(`${a.site.name} affiliate program`, `برنامج الأفلييت لـ ${a.site.name}`)}</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{t(`Share ${a.site.name} with your audience. When someone you refer pays, you earn a commission. ${a.site.whatTheySell.en}`, `شارك ${a.site.name} مع جمهورك. لما حد تحيله يدفع، بتكسب عمولة. ${a.site.whatTheySell.ar}`)}</p>
        {s?.provisional && <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs px-3 py-1.5"><ShieldAlert className="w-4 h-4 shrink-0" />{t("Provisional terms: rates and rules may change before the program is final.", "شروط مبدئية: النسب والقواعد ممكن تتغير قبل اعتماد البرنامج.")}</div>}
      </div>
    </section>
  );

  const Facts = s && (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <Stat icon={<DollarSign className="w-4 h-4" />} label={t("Commission", "العمولة")} value={`${Number(s.default_rate)}%`} />
      <Stat icon={<MousePointerClick className="w-4 h-4" />} label={t("Tracking window", "مدة التتبع")} value={t(`${s.cookie_days} days`, `${s.cookie_days} يوم`)} />
      <Stat icon={<Wallet className="w-4 h-4" />} label={t("Minimum payout", "أقل سحب")} value={money(s.min_payout_cents, s.currency)} />
      <Stat icon={<UserPlus className="w-4 h-4" />} label={t("Commission period", "فترة العمولة")} value={t(`${s.commission_months} months`, `${s.commission_months} شهر`)} />
    </div>
  );

  const steps: [string, string][] = [
    [t("1. Join", "1. انضم"), t("Create a free account. Your personal link and code are ready right away, no application.", "اعمل حساب مجاني. رابطك وكودك جاهزين فورا بدون تقديم.")],
    [t("2. Share", "2. شارك"), t("Share the link or the videos from your media kit. We count clicks and signups.", "شارك الرابط أو الفيديوهات من الميديا كيت. بنحسب النقرات والتسجيلات.")],
    [t("3. Earn", "3. اكسب"), t("You earn a commission on paid purchases from the people you refer. Payouts are reviewed and sent by us.", "بتكسب عمولة على مشتريات الناس اللي تحيلهم. السحب بنراجعه ونحوله بأنفسنا.")],
  ];
  const How = (
    <div className="grid gap-4 md:grid-cols-3" dir={dir}>
      {steps.map(([h, p]) => <Card key={h}><CardContent className="p-5"><div className="font-semibold mb-1">{h}</div><p className="text-sm text-muted-foreground">{p}</p></CardContent></Card>)}
    </div>
  );

  const Join = (
    <Card id="join"><CardHeader><CardTitle className="text-lg" dir={dir}>{t("Join the affiliate program", "انضم لبرنامج الأفلييت")}</CardTitle></CardHeader><CardContent className="space-y-3" dir={dir}>
      {a.authLoading || me === undefined ? <div className="space-y-2"><p className="text-sm text-muted-foreground">{t("Loading...", "جاري التحميل...")}</p>{slow && <div className="flex gap-2 flex-wrap"><Button variant="outline" onClick={() => window.location.reload()}>{t("Reload", "إعادة تحميل")}</Button><Button onClick={a.goSignIn}>{t("Sign in / create account", "تسجيل الدخول / إنشاء حساب")}</Button></div>}</div> : loadErr ? <div className="space-y-2"><p className="text-sm text-red-600">{t("Could not load your account. Please try again.", "تعذر تحميل حسابك. حاول مرة أخرى.")}</p><Button variant="outline" onClick={load}>{t("Retry", "إعادة المحاولة")}</Button></div> : !a.user ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{t(`Sign in or create a free ${a.site.name} account. Your affiliate link is ready instantly.`, `سجل دخولك أو اعمل حساب مجاني في ${a.site.name}. رابط الأفلييت بتاعك جاهز فورا.`)}</p>
          {a.emailSignIn ? (
            sent ? <p className="text-sm text-emerald-600">{t("Check your email for the sign-in link, then come back to this page.", "راجع إيميلك لرابط الدخول ثم ارجع لهذه الصفحة.")}</p> : (
              <div className="flex gap-2"><Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} dir="ltr" /><Button disabled={!/.+@.+\..+/.test(form.email) || busy} onClick={async () => { setBusy(true); try { await a.emailSignIn!(form.email.trim()); setSent(true); } catch { setMsg(t("Could not send the link.", "تعذر إرسال الرابط.")); } setBusy(false); }}>{t("Email me a link", "ابعتلي رابط")}</Button></div>
            )
          ) : <Button onClick={a.goSignIn}>{t("Sign in / create account", "تسجيل الدخول / إنشاء حساب")}</Button>}
        </div>
      ) : aff ? (
        <div className="flex items-center justify-between gap-3 flex-wrap"><span className="text-sm">{t("You are already an affiliate.", "أنت أفلييت بالفعل.")}</span><Button asChild><Link to="/affiliates/dashboard">{t("Open my dashboard", "افتح لوحتي")}</Link></Button></div>
      ) : s && !s.enabled ? <p className="text-sm text-muted-foreground">{t("The program is not accepting new affiliates right now.", "البرنامج لا يقبل أفلييت جدد حاليا.")}</p> : (
        <div className="space-y-3">
          <div><label className="text-xs text-muted-foreground">{t("Your name or channel name", "اسمك أو اسم قناتك")}</label><Input value={form.name} maxLength={80} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><label className="text-xs text-muted-foreground">{t("Website or social profile (optional)", "موقع أو حساب سوشيال (اختياري)")}</label><Input value={form.site} maxLength={200} dir="ltr" onChange={(e) => setForm({ ...form, site: e.target.value })} /></div>
          <div><label className="text-xs text-muted-foreground">{t("How will you promote it?", "هتروّج له إزاي؟")}</label><textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]" maxLength={500} value={form.promo} onChange={(e) => setForm({ ...form, promo: e.target.value })} /></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className="text-xs text-muted-foreground">{t("Payout method (you can set it later)", "طريقة السحب (تقدر تحددها بعدين)")}</label>
              <select className={sel} value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}><option value="">-</option>{methods.map((m) => <option key={m} value={m}>{mlabel(m, a.lang)}</option>)}</select></div>
            <div><label className="text-xs text-muted-foreground">{t("Payout details (email, IBAN, phone)", "بيانات السحب (إيميل / IBAN / رقم)")}</label><Input value={form.details} maxLength={300} dir="ltr" onChange={(e) => setForm({ ...form, details: e.target.value })} /></div>
          </div>
          <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" checked={form.ok} onChange={(e) => setForm({ ...form, ok: e.target.checked })} /><span>{t("I am 18 or older and I accept the ", "عمري 18 أو أكثر وأوافق على ")}<Link className="underline" to="/affiliates/terms">{t("affiliate terms", "شروط الأفلييت")}</Link>.</span></label>
          <Button disabled={!form.ok || !form.name.trim() || busy} onClick={join}>{t("Apply", "قدّم الطلب")}</Button>
        </div>
      )}
      {msg && <p className="text-sm text-red-600">{msg}</p>}
    </CardContent></Card>
  );

  const th = "p-3 text-start text-xs text-muted-foreground font-normal whitespace-nowrap";
  const Dashboard = aff && me && (
    <div className="space-y-6" dir={dir}>
      {aff.status !== "approved" && <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm">{aff.status === "pending" ? t("Your application is waiting for approval. Your link already tracks clicks and signups; payouts need approval.", "طلبك في انتظار الموافقة. رابطك بيتتبع النقرات والتسجيلات بالفعل؛ السحب يحتاج موافقة.") : t(`Your affiliate account is ${aff.status}.`, `حساب الأفلييت الخاص بك: ${aff.status}.`)}</div>}
      <Card><CardHeader><CardTitle className="text-base">{t("Your referral link", "رابط الإحالة الخاص بك")}</CardTitle></CardHeader><CardContent className="space-y-3">
        <CopyField lang={a.lang} value={path === "/" ? link : `${a.site.url}${path}${path.includes("?") ? "&" : "?"}ref=${aff.code}`} />
        <div className="space-y-1"><label className="text-xs text-muted-foreground">{t("Customize your link name (3-24 letters, numbers, - or _). Old links keep working.", "خصص اسم رابطك (3-24 حرف أو رقم أو - أو _). الروابط القديمة تفضل شغالة.")}</label>
          <div className="flex gap-2"><Input dir="ltr" value={newCode ?? aff.code} maxLength={24} onChange={(e) => setNewCode(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))} />
          <Button variant="outline" disabled={busy || !newCode || newCode === aff.code} onClick={async () => { setBusy(true); setMsg(""); const { error } = await a.supabase.rpc("aff_set_code", { p_code: newCode }); setBusy(false); if (error) setMsg(errMsg(error, t)); else { setMsg(t("Link updated.", "تم تحديث الرابط.")); setNewCode(null); await load(); } }}>{t("Save name", "احفظ الاسم")}</Button></div></div>
        <div className="flex flex-wrap gap-2 items-center text-xs"><span className="text-muted-foreground">{t("Link to page:", "رابط لصفحة:")}</span>
          {a.site.paths.map((p) => <button key={p.path} className={`px-2.5 py-1 rounded-full border ${path === p.path ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`} onClick={() => setPath(p.path)}>{t(p.en, p.ar)}</button>)}</div>
        <div className="text-xs text-muted-foreground">{t("Your code:", "الكود:")} <span className="font-mono font-semibold text-foreground">{aff.code}</span> · {t("Commission rate:", "نسبة العمولة:")} <b className="text-foreground">{me.effective_rate}%</b>{s?.provisional ? ` (${t("provisional", "مبدئية")})` : ""}</div>
      </CardContent></Card>
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Stat icon={<MousePointerClick className="w-4 h-4" />} label={t("Clicks", "النقرات")} value={me.clicks} />
        <Stat icon={<UserPlus className="w-4 h-4" />} label={t("Signups", "التسجيلات")} value={me.signups} />
        <Stat icon={<DollarSign className="w-4 h-4" />} label={t("Paid sales", "مبيعات مدفوعة")} value={me.sales} />
        <Stat icon={<Wallet className="w-4 h-4" />} label={t("Available to withdraw", "المتاح للسحب")} value={money(me.approved_cents, s?.currency)} />
        <Stat icon={<DollarSign className="w-4 h-4" />} label={t("Pending", "معلّق")} value={money(me.pending_cents, s?.currency)} />
        <Stat icon={<Wallet className="w-4 h-4" />} label={t("In payout request", "في طلب سحب")} value={money(me.in_payout_cents, s?.currency)} />
        <Stat icon={<Check className="w-4 h-4" />} label={t("Paid out", "تم دفعه")} value={money(me.paid_cents, s?.currency)} />
      </div>
      <Tabs defaultValue="overview">
        <TabsList className="flex-wrap h-auto"><TabsTrigger value="overview">{t("Overview", "نظرة عامة")}</TabsTrigger><TabsTrigger value="commissions">{t("Commissions", "العمولات")}</TabsTrigger><TabsTrigger value="referrals">{t("Referrals", "الإحالات")}</TabsTrigger><TabsTrigger value="payouts">{t("Payouts", "السحب")}</TabsTrigger><TabsTrigger value="kit">{t("Media kit", "الميديا كيت")}</TabsTrigger></TabsList>
        <TabsContent value="overview"><Card><CardHeader><CardTitle className="text-base">{t("Clicks, last 30 days", "النقرات آخر 30 يوم")}</CardTitle></CardHeader><CardContent>
          {me.daily_clicks.length === 0 ? <p className="text-sm text-muted-foreground">{t("No clicks yet. Share your link to get started.", "لا نقرات بعد. شارك رابطك للبدء.")}</p> : <div className="flex items-end gap-1 h-32" dir="ltr">{me.daily_clicks.map((x: any) => <div key={x.d} title={`${x.d}: ${x.n}`} className="flex-1 bg-primary/70 rounded-t min-w-[4px]" style={{ height: `${(x.n / maxDaily) * 100}%` }} />)}</div>}
        </CardContent></Card></TabsContent>
        <TabsContent value="commissions"><Card><CardContent className="p-0 overflow-x-auto">{me.ledger.length === 0 ? <p className="p-5 text-sm text-muted-foreground">{t("No commissions yet.", "لا عمولات بعد.")}</p> : <table className="w-full text-sm"><thead><tr><th className={th}>{t("Date", "التاريخ")}</th><th className={th}>{t("Type", "النوع")}</th><th className={th}>{t("Order", "الطلب")}</th><th className={th}>{t("Rate", "النسبة")}</th><th className={th}>{t("Commission", "العمولة")}</th><th className={th}>{t("Status", "الحالة")}</th></tr></thead><tbody>{me.ledger.map((l: any) => <tr key={l.id} className="border-t border-border"><td className="p-3 whitespace-nowrap">{dt(l.created_at)}</td><td className="p-3">{l.kind === "sale" ? t("Sale", "بيع") : l.kind === "reversal" ? t("Refund reversal", "عكس استرداد") : t("Adjustment", "تعديل")}</td><td className="p-3">{money(l.order_cents, l.currency)}</td><td className="p-3">{l.rate ?? "-"}%</td><td className="p-3 font-medium">{money(l.amount_cents, l.currency)}</td><td className="p-3"><StatusPill s={l.status} /></td></tr>)}</tbody></table>}</CardContent></Card></TabsContent>
        <TabsContent value="referrals"><Card><CardContent className="p-0">{me.referrals.length === 0 ? <p className="p-5 text-sm text-muted-foreground">{t("No signups yet.", "لا تسجيلات بعد.")}</p> : <ul className="divide-y divide-border text-sm">{me.referrals.map((r: any, i: number) => <li key={i} className="p-3 flex justify-between"><span>{t("Referred signup", "تسجيل محال")} #{me.referrals.length - i}</span><span className="text-muted-foreground">{dt(r.created_at)}</span></li>)}</ul>}<p className="p-3 text-xs text-muted-foreground border-t border-border">{t("Referred people stay private. You only see dates and counts.", "هوية المحالين خاصة. بتشوف التواريخ والأعداد فقط.")}</p></CardContent></Card></TabsContent>
        <TabsContent value="payouts" className="space-y-4">
          <Card><CardHeader><CardTitle className="text-base">{t("Payout details", "بيانات السحب")}</CardTitle></CardHeader><CardContent className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2"><select className={sel} value={method?.m || ""} onChange={(e) => setMethod({ m: e.target.value, d: method?.d || "" })}><option value="">{t("Choose method", "اختر الطريقة")}</option>{methods.map((m) => <option key={m} value={m}>{mlabel(m, a.lang)}</option>)}</select><Input dir="ltr" maxLength={300} placeholder={t("Email / IBAN / phone number", "إيميل / IBAN / رقم")} value={method?.d || ""} onChange={(e) => setMethod({ m: method?.m || "", d: e.target.value })} /></div>
            <div className="flex gap-2 flex-wrap"><Button variant="outline" disabled={busy} onClick={saveMethod}>{t("Save", "حفظ")}</Button><Button disabled={busy || aff.status !== "approved" || me.approved_cents < (s?.min_payout_cents ?? 0) || me.approved_cents <= 0} onClick={requestPayout}>{t(`Request payout (${money(me.approved_cents, s?.currency)})`, `اطلب السحب (${money(me.approved_cents, s?.currency)})`)}</Button></div>
            <p className="text-xs text-muted-foreground">{t(`Minimum payout ${money(s?.min_payout_cents ?? 0, s?.currency)}. Payouts are reviewed and sent manually. Nothing is automatic.`, `أقل سحب ${money(s?.min_payout_cents ?? 0, s?.currency)}. السحب بيتراجع ويتحول يدويا. لا يوجد دفع تلقائي.`)}</p>
          </CardContent></Card>
          <Card><CardContent className="p-0 overflow-x-auto">{me.payouts.length === 0 ? <p className="p-5 text-sm text-muted-foreground">{t("No payout requests yet.", "لا طلبات سحب بعد.")}</p> : <table className="w-full text-sm"><tbody>{me.payouts.map((p: any) => <tr key={p.id} className="border-t border-border first:border-0"><td className="p-3">{dt(p.requested_at)}</td><td className="p-3 font-medium">{money(p.amount_cents, s?.currency)}</td><td className="p-3">{mlabel(p.method, a.lang)}</td><td className="p-3"><StatusPill s={p.status} /></td><td className="p-3 text-muted-foreground" dir="ltr">{p.reference || ""}</td></tr>)}</tbody></table>}</CardContent></Card>
        </TabsContent>
        <TabsContent value="kit"><MediaKit a={a} code={aff.code} /></TabsContent>
      </Tabs>
      {msg && <p className="text-sm">{msg}</p>}
    </div>
  );

  const tabs: [string, string, string][] = [["program", "/affiliates", t("Program", "البرنامج")], ["dashboard", "/affiliates/dashboard", t("My dashboard", "لوحتي")], ["terms", "/affiliates/terms", t("Terms", "الشروط")]];
  return (
    <a.Layout>
      {Hero}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <div className="flex gap-2 text-sm flex-wrap" dir={dir}>
          {tabs.map(([k, to, label]) => <Link key={k} to={to} className={`px-3 py-1.5 rounded-full border ${view === k ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}>{label}</Link>)}
          {isAdm && <Link to="/affiliates/admin" className="px-3 py-1.5 rounded-full border border-amber-500/50 text-amber-600 hover:bg-amber-500/10">{t("Admin", "الإدارة")}</Link>}
        </div>
        {view === "terms" ? <Card><CardHeader><CardTitle dir={dir}>{t("Affiliate program terms", "شروط برنامج الأفلييت")}</CardTitle></CardHeader><CardContent><TermsBody a={a} s={s} /></CardContent></Card> :
          view === "dashboard" ? (aff ? Dashboard : Join) : (
            <>
              {Facts}{How}{Join}
              <section dir={dir}><h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Film className="w-5 h-5" />{t("Media kit", "الميديا كيت")}</h2><p className="text-sm text-muted-foreground mb-4">{t("Affiliates get a media kit with our videos for every platform, ready to share. A few examples:", "الأفلييت بياخدوا ميديا كيت فيها فيديوهاتنا لكل المنصات جاهزة للمشاركة. أمثلة:")}</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{productVideos.filter((v) => v.product === a.site.product && v.lang === a.lang).slice(0, 3).map((v) => <VideoCard key={v.id} v={v} lang={a.lang} />)}</div></section>
              <p className="text-xs text-muted-foreground text-center" dir={dir}>{t("Earnings depend entirely on your referrals and are not guaranteed.", "الأرباح تعتمد بالكامل على إحالاتك وغير مضمونة.")}</p>
            </>
          )}
      </div>
    </a.Layout>
  );
}

/* ---------- admin ---------- */
export function AffiliateAdminPage({ a }: { a: AffAdapter }) {
  const t = T(a.lang);
  const [ok, setOk] = useState<boolean | null>(null);
  const [o, setO] = useState<any>(null);
  const [msg, setMsg] = useState("");
  const [ref, setRef] = useState<Record<string, string>>({});
  const [edit, setEdit] = useState<Record<string, { rate: string; note: string; status: string }>>({});
  const [cfg, setCfg] = useState<any>(null);
  const load = useCallback(async () => {
    const { data: adm } = await a.supabase.rpc("aff_is_admin");
    setOk(!!adm);
    if (!adm) return;
    const { data, error } = await a.supabase.rpc("aff_admin_overview");
    if (error) { setMsg(error.message); return; }
    setO(data);
    setCfg((c: any) => c || { rate: data.settings.default_rate, cookie: data.settings.cookie_days, min: data.settings.min_payout_cents / 100, hold: data.settings.hold_days, months: data.settings.commission_months, auto: data.settings.auto_approve, enabled: data.settings.enabled, methods: (data.settings.payout_methods || []).join(",") });
  }, [a.supabase]);
  useEffect(() => { if (a.authLoading) return; if (a.user) load(); else setOk(false); }, [a.authLoading, a.user?.id, load]);
  const run = async (fn: string, args: any, done?: string) => { setMsg(""); const { error, data } = await a.supabase.rpc(fn, args); if (error) setMsg(error.message); else { setMsg(done ? `${done}${typeof data === "number" ? ` (${data})` : ""}` : t("Done.", "تم.")); await load(); } };
  const dir = a.lang === "ar" ? "rtl" : "ltr";
  const th = "p-2 text-start text-xs text-muted-foreground font-normal whitespace-nowrap";
  const td = "p-2 align-top";
  const sel = "h-9 rounded-md border border-input bg-background px-2 text-sm";
  return (
    <a.Layout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-5" dir={dir}>
        <h1 className="text-2xl font-bold">{t("Affiliate admin", "إدارة الأفلييت")} - {a.site.name}</h1>
        {ok === null ? <p>...</p> : !ok ? <p className="text-sm text-muted-foreground">{t("Admins only. Sign in with an admin account.", "للأدمن فقط. سجل دخول بحساب أدمن.")}</p> : !o ? <p>{msg || "..."}</p> : (
          <>
            {o.settings.provisional && <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm">{t("Settings are still provisional defaults. Save the Settings tab once to confirm them.", "الإعدادات لسه افتراضية مبدئية. احفظ تبويب الإعدادات مرة لتأكيدها.")}</div>}
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
              <Stat icon={<UserPlus className="w-4 h-4" />} label={t("Affiliates", "الأفلييت")} value={o.affiliates.length} />
              <Stat icon={<MousePointerClick className="w-4 h-4" />} label={t("Clicks", "النقرات")} value={o.totals.clicks} />
              <Stat icon={<Link2 className="w-4 h-4" />} label={t("Signups", "التسجيلات")} value={o.totals.signups} />
              <Stat icon={<DollarSign className="w-4 h-4" />} label={t("Sales", "المبيعات")} value={o.totals.sales} />
              <Stat icon={<Wallet className="w-4 h-4" />} label={t("Open payouts", "سحب مفتوح")} value={o.payouts.filter((p: any) => ["requested", "approved"].includes(p.status)).length} />
            </div>
            {msg && <div className="text-sm rounded-md border border-border bg-muted px-3 py-2">{msg}</div>}
            <Tabs defaultValue="affiliates">
              <TabsList className="flex-wrap h-auto"><TabsTrigger value="affiliates">{t("Affiliates", "الأفلييت")}</TabsTrigger><TabsTrigger value="commissions">{t("Commissions", "العمولات")}</TabsTrigger><TabsTrigger value="payouts">{t("Payouts", "السحب")}</TabsTrigger><TabsTrigger value="review">{t("Fraud review", "مراجعة الاحتيال")} ({o.flagged.length})</TabsTrigger><TabsTrigger value="settings">{t("Settings", "الإعدادات")}</TabsTrigger></TabsList>
              <TabsContent value="affiliates"><Card><CardContent className="p-0 overflow-x-auto"><table className="w-full text-sm"><thead><tr><th className={th}>{t("Affiliate", "الأفلييت")}</th><th className={th}>{t("Stats", "الإحصاء")}</th><th className={th}>{t("Status", "الحالة")}</th><th className={th}>{t("Rate % (blank = default)", "النسبة % (فاضي = الافتراضي)")}</th><th className={th}>{t("Note", "ملاحظة")}</th><th className={th} /></tr></thead><tbody>
                {o.affiliates.map((x: any) => { const e = edit[x.id] || { rate: x.rate_override ?? "", note: x.admin_note || "", status: x.status }; const set = (p: any) => setEdit({ ...edit, [x.id]: { ...e, ...p } }); return (
                  <tr key={x.id} className="border-t border-border"><td className={td}><div className="font-medium">{x.display_name || x.email}</div><div className="text-xs text-muted-foreground" dir="ltr">{x.email}</div><div className="text-xs font-mono">{x.code}</div>{x.website && <div className="text-xs text-muted-foreground" dir="ltr">{x.website}</div>}{x.promo_description && <div className="text-xs mt-1 max-w-xs">{x.promo_description}</div>}<div className="text-xs mt-1">{x.payout_method ? mlabel(x.payout_method, a.lang) : "-"} {x.payout_details && <span dir="ltr">· {x.payout_details}</span>}</div></td>
                    <td className={td + " text-xs"}>{x.clicks} {t("clicks", "نقرة")}<br />{x.signups} {t("signups", "تسجيل")}<br />{t("pending", "معلق")} {money(x.pending_cents)}<br />{t("approved", "معتمد")} {money(x.approved_cents)}<br />{t("paid", "مدفوع")} {money(x.paid_cents)}</td>
                    <td className={td}><select className={sel} value={e.status} onChange={(ev) => set({ status: ev.target.value })}>{["pending", "approved", "suspended", "rejected"].map((s) => <option key={s} value={s}>{s}</option>)}</select></td>
                    <td className={td}><Input className="w-24" dir="ltr" inputMode="decimal" value={e.rate} onChange={(ev) => set({ rate: ev.target.value })} /></td>
                    <td className={td}><Input className="w-48" value={e.note} maxLength={500} onChange={(ev) => set({ note: ev.target.value })} /></td>
                    <td className={td}><Button size="sm" onClick={() => run("aff_admin_set_affiliate", { p_id: x.id, p_status: e.status, p_rate: e.rate === "" ? null : Number(e.rate), p_note: e.note })}>{t("Save", "حفظ")}</Button></td></tr>); })}
                {o.affiliates.length === 0 && <tr><td className="p-4 text-muted-foreground" colSpan={6}>{t("No affiliates yet.", "لا أفلييت بعد.")}</td></tr>}</tbody></table></CardContent></Card></TabsContent>
              <TabsContent value="commissions" className="space-y-3"><div className="flex items-center flex-wrap gap-3"><Button size="sm" onClick={() => run("aff_admin_approve_matured", {}, t("Approved matured commissions", "تم اعتماد العمولات المستحقة"))}>{t("Approve all commissions past the hold period", "اعتمد كل العمولات اللي انتهت فترة تعليقها")}</Button><span className="text-xs text-muted-foreground">{t("Skips flagged referrals and non-approved affiliates.", "يتخطى الإحالات المعلّمة والأفلييت غير المعتمدين.")}</span></div>
                <Card><CardContent className="p-0 overflow-x-auto"><table className="w-full text-sm"><thead><tr><th className={th}>{t("Date", "التاريخ")}</th><th className={th}>{t("Affiliate", "الأفلييت")}</th><th className={th}>{t("Type", "النوع")}</th><th className={th}>{t("Order", "الطلب")}</th><th className={th}>{t("Commission", "العمولة")}</th><th className={th}>{t("Status", "الحالة")}</th><th className={th}>{t("Matures", "يستحق")}</th><th className={th} /></tr></thead><tbody>
                  {o.ledger.map((l: any) => <tr key={l.id} className="border-t border-border"><td className={td}>{dt(l.created_at)}</td><td className={td + " font-mono text-xs"}>{l.code}</td><td className={td}>{l.kind}{l.flagged && <Badge variant="destructive" className="ms-1">flag</Badge>}</td><td className={td}>{money(l.order_cents, l.currency)} <span className="text-xs text-muted-foreground">{l.product}</span></td><td className={td + " font-medium"}>{money(l.amount_cents, l.currency)}</td><td className={td}><StatusPill s={l.status} /></td><td className={td + " text-xs"}>{l.status === "pending" ? dt(l.approve_after) : ""}</td><td className={td + " whitespace-nowrap"}>{l.status === "pending" && <><Button size="sm" variant="outline" onClick={() => run("aff_admin_ledger_set", { p_ids: [l.id], p_status: "approved" })}>{t("Approve", "اعتمد")}</Button> <Button size="sm" variant="ghost" onClick={() => run("aff_admin_ledger_set", { p_ids: [l.id], p_status: "void" })}>{t("Void", "إلغاء")}</Button></>}</td></tr>)}
                  {o.ledger.length === 0 && <tr><td className="p-4 text-muted-foreground" colSpan={8}>{t("No commissions yet.", "لا عمولات بعد.")}</td></tr>}</tbody></table></CardContent></Card></TabsContent>
              <TabsContent value="payouts"><Card><CardContent className="p-0 overflow-x-auto"><table className="w-full text-sm"><thead><tr><th className={th}>{t("Requested", "الطلب")}</th><th className={th}>{t("Affiliate", "الأفلييت")}</th><th className={th}>{t("Amount", "المبلغ")}</th><th className={th}>{t("Pay to", "ادفع إلى")}</th><th className={th}>{t("Status", "الحالة")}</th><th className={th}>{t("Reference (transaction id)", "مرجع (رقم التحويل)")}</th><th className={th} /></tr></thead><tbody>
                {o.payouts.map((p: any) => <tr key={p.id} className="border-t border-border"><td className={td}>{dt(p.requested_at)}</td><td className={td}><div className="font-mono text-xs">{p.code}</div><div className="text-xs text-muted-foreground" dir="ltr">{p.email}</div></td><td className={td + " font-medium"}>{money(p.amount_cents)}</td><td className={td + " text-xs"}>{mlabel(p.method, a.lang)}<br /><span dir="ltr">{p.details}</span></td><td className={td}><StatusPill s={p.status} /></td><td className={td}>{["requested", "approved"].includes(p.status) ? <Input className="w-44" dir="ltr" value={ref[p.id] || ""} onChange={(e) => setRef({ ...ref, [p.id]: e.target.value })} /> : <span dir="ltr" className="text-xs">{p.reference}</span>}</td><td className={td + " whitespace-nowrap"}>{p.status === "requested" && <Button size="sm" variant="outline" onClick={() => run("aff_admin_payout_set", { p_id: p.id, p_status: "approved", p_reference: "", p_note: "" })}>{t("Approve", "اعتمد")}</Button>}{p.status === "approved" && <Button size="sm" onClick={() => { if (confirm(t("Mark as paid? This only records that you sent the money yourself.", "تسجيل كمدفوع؟ ده بيسجل فقط إنك حولت الفلوس بنفسك."))) run("aff_admin_payout_set", { p_id: p.id, p_status: "paid", p_reference: ref[p.id] || "", p_note: "" }); }}>{t("Mark paid", "تم الدفع")}</Button>} {["requested", "approved"].includes(p.status) && <Button size="sm" variant="ghost" onClick={() => run("aff_admin_payout_set", { p_id: p.id, p_status: "rejected", p_reference: "", p_note: "" })}>{t("Reject", "رفض")}</Button>}</td></tr>)}
                {o.payouts.length === 0 && <tr><td className="p-4 text-muted-foreground" colSpan={7}>{t("No payout requests yet.", "لا طلبات سحب بعد.")}</td></tr>}</tbody></table></CardContent></Card>
                <p className="text-xs text-muted-foreground mt-2">{t("Nothing here moves money. You send the payment yourself, then record it with Mark paid.", "لا شيء هنا يحرك فلوس. أنت تحول المبلغ بنفسك ثم تسجله بـ تم الدفع.")}</p></TabsContent>
              <TabsContent value="review"><Card><CardContent className="p-0 overflow-x-auto"><table className="w-full text-sm"><thead><tr><th className={th}>{t("Date", "التاريخ")}</th><th className={th}>{t("Affiliate", "الأفلييت")}</th><th className={th}>{t("Referred account", "الحساب المحال")}</th><th className={th}>{t("Reason", "السبب")}</th><th className={th}>{t("Status", "الحالة")}</th><th className={th} /></tr></thead><tbody>
                {o.flagged.map((r: any) => <tr key={r.id} className="border-t border-border"><td className={td}>{dt(r.created_at)}</td><td className={td + " font-mono text-xs"}>{r.code}</td><td className={td} dir="ltr">{r.referred_email}</td><td className={td + " text-xs"}>{r.flag_reason}</td><td className={td}><StatusPill s={r.status === "blocked" ? "void" : "pending"} /> {r.status}</td><td className={td + " whitespace-nowrap"}>{r.status !== "blocked" && <Button size="sm" variant="destructive" onClick={() => run("aff_admin_referral_set", { p_id: r.id, p_block: true })}>{t("Block + void pending", "حظر + إلغاء المعلق")}</Button>} {(r.flagged || r.status === "blocked") && <Button size="sm" variant="outline" onClick={() => run("aff_admin_referral_set", { p_id: r.id, p_block: false })}>{t("Clear flag", "إزالة العلامة")}</Button>}</td></tr>)}
                {o.flagged.length === 0 && <tr><td className="p-4 text-muted-foreground" colSpan={6}>{t("Nothing flagged. Self-referrals are blocked automatically. Same-network and repeat-network signups show up here.", "لا شيء معلّم. الإحالة الذاتية بتتمنع تلقائيا. التسجيلات من نفس الشبكة بتظهر هنا.")}</td></tr>}</tbody></table></CardContent></Card></TabsContent>
              <TabsContent value="settings"><Card><CardContent className="p-5 space-y-4 max-w-xl">
                {cfg && <>
                  {([["rate", t("Default commission %", "نسبة العمولة الافتراضية %")], ["cookie", t("Tracking window (days)", "مدة التتبع (أيام)")], ["min", t("Minimum payout (USD)", "أقل سحب (دولار)")], ["hold", t("Hold before approval (days)", "فترة التعليق قبل الاعتماد (أيام)")], ["months", t("Commission period (months)", "فترة العمولة (شهور)")]] as const).map(([k, label]) => <div key={k}><label className="text-xs text-muted-foreground">{label}</label><Input dir="ltr" inputMode="decimal" value={cfg[k]} onChange={(e) => setCfg({ ...cfg, [k]: e.target.value })} /></div>)}
                  <div><label className="text-xs text-muted-foreground">{t("Payout methods (comma separated: paypal,bank_transfer,payoneer,instapay,mobile_wallet_egypt)", "طرق السحب (مفصولة بفاصلة)")}</label><Input dir="ltr" value={cfg.methods} onChange={(e) => setCfg({ ...cfg, methods: e.target.value })} /></div>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={cfg.auto} onChange={(e) => setCfg({ ...cfg, auto: e.target.checked })} />{t("Auto-approve new affiliates", "اعتماد الأفلييت الجدد تلقائيا")}</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={cfg.enabled} onChange={(e) => setCfg({ ...cfg, enabled: e.target.checked })} />{t("Program open", "البرنامج مفتوح")}</label>
                  <Button onClick={() => run("aff_admin_update_settings", { p_rate: Number(cfg.rate), p_cookie: Math.round(Number(cfg.cookie)), p_min: Math.round(Number(cfg.min) * 100), p_hold: Math.round(Number(cfg.hold)), p_months: Math.round(Number(cfg.months)), p_auto: cfg.auto, p_methods: String(cfg.methods).split(",").map((x: string) => x.trim()).filter(Boolean), p_enabled: cfg.enabled }, t("Settings saved", "تم حفظ الإعدادات"))}>{t("Save settings", "حفظ الإعدادات")}</Button>
                </>}
              </CardContent></Card></TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </a.Layout>
  );
}

/* ---------- on-site videos page ---------- */
export function ProductVideosPage({ a }: { a: AffAdapter }) {
  const t = T(a.lang);
  useEffect(() => { document.title = `${t("Videos", "فيديوهات")} | ${a.site.name}`; }, [a.lang]);
  const mine = productVideos.filter((v) => v.product === a.site.product);
  const inLang = mine.filter((v) => v.lang === a.lang);
  const rest = mine.filter((v) => v.lang !== a.lang);
  const dir = a.lang === "ar" ? "rtl" : "ltr";
  return (
    <a.Layout>
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8" dir={dir}>
        <div>
          <h1 className="text-3xl font-bold">{t(`${a.site.name} videos`, `فيديوهات ${a.site.name}`)}</h1>
          <p className="mt-2 text-muted-foreground">{t("Walkthroughs and explainers on YouTube. New videos are added as they are published.", "شروحات وفيديوهات تعريفية على يوتيوب. بنضيف الجديد أول بأول.")}</p>
        </div>
        {inLang.length > 0 && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{inLang.map((v) => <VideoCard key={v.id} v={v} lang={a.lang} />)}</div>}
        {rest.length > 0 && <div><h2 className="text-lg font-semibold mb-3">{a.lang === "ar" ? "Videos in English" : "الفيديوهات بالعربية"}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rest.map((v) => <VideoCard key={v.id} v={v} lang={a.lang} />)}</div></div>}
        <p className="text-sm text-muted-foreground"><Link className="underline" to="/affiliates">{t("Earn by sharing - affiliate program", "اكسب بالمشاركة - برنامج الأفلييت")}</Link></p>
      </div>
    </a.Layout>
  );
}
