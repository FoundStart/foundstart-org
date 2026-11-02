const PRERENDER_CSS = '<script>window.__fsPrerender=true;try{var t=localStorage.getItem("theme");if(t==="dark"||((!t||t==="system")&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}</script><style>html:has(#root>main[data-prerender]:not([data-home])),html:has(#root>main[data-prerender]:not([data-home])) body{background:#0e0a1b!important}#root>main[data-prerender]:not([data-home]){max-width:768px;margin:0 auto;padding:110px 24px 70px;color:#e8ecf3;line-height:1.75;font-family:Inter,system-ui,-apple-system,sans-serif}#root>main[data-prerender]:not([data-home]) h1{font-size:1.9rem;line-height:1.25;margin:0 0 16px}#root>main[data-prerender]:not([data-home]) h2{font-size:1.35rem;margin:30px 0 10px}#root>main[data-prerender]:not([data-home]) h3{font-size:1.1rem;margin:22px 0 6px}#root>main[data-prerender]:not([data-home]) p{margin:0 0 14px}#root>main[data-prerender]:not([data-home]) a{color:#60a5fa}#root>main[data-prerender]:not([data-home]) img{max-width:100%;height:auto}#root>main[data-prerender]:not([data-home]) section{margin:0 0 26px}</style>';
// Post-build step (no browser needed): writes one HTML file per known route with its own
// <title>, description, canonical and Open Graph tags plus the page heading/summary in the
// HTML itself, adds a 404 page, and rewrites sitemap.xml with fresh lastmod dates.
// Per-route data lives in scripts/seo-manifest.json (regenerate with scripts/seo-crawl.py).
import fs from "node:fs"; import path from "node:path";
const cfg = JSON.parse(fs.readFileSync("scripts/seo-config.json", "utf8"));   // {site, sitemapExclude:[prefixes]}
const manifest = JSON.parse(fs.readFileSync("scripts/seo-manifest.json", "utf8"));
const dist = path.resolve("dist"); const shell = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const today = new Date().toISOString().slice(0, 10);
// Load full article bodies + FAQ data from the typed source files (bundled with esbuild,
// which ships with vite). Used to prerender complete article/FAQ content into server HTML.
const require2 = (await import("node:module")).createRequire(import.meta.url);
const esbuild = require2("esbuild");
const bundleOut = path.resolve("node_modules/.cache/fs-prerender-data.mjs");
esbuild.buildSync({
  entryPoints: ["scripts/article-bodies-entry.ts"], bundle: true, format: "esm", platform: "node",
  outfile: bundleOut, logLevel: "silent", alias: { "@": path.resolve("src") },
  loader: { ".png": "text", ".jpg": "text", ".jpeg": "text", ".svg": "text", ".webp": "text", ".gif": "text", ".mp4": "text", ".css": "text" },
});
const pdata = await import(bundleOut.href ?? bundleOut);
const ARTICLES = { ...pdata.shortetArticles, ...pdata.foundstartArticles, ...pdata.shortetArticlesAr, ...pdata.agencyArticles };
const FAQS = pdata.faqCategories || [];
// Default locale (EN) only: this block must equal what the /faq UI shows by default.
// The AR FAQ remains available through the site's language toggle (client-rendered), as before.
const faqHtml = FAQS.length
  ? FAQS.map((c) => `<section><h2>${esc(c.title)}</h2>${c.items.map((i) => `<h3>${esc(i.q)}</h3><p>${esc(i.a)}</p>`).join("")}</section>`).join("")
  : "";
const HOME_PRE_CSS = '<style>html:has(#root>main[data-prerender][data-home]),html:has(#root>main[data-prerender][data-home]) body{background:#05050a!important}</style>';
// Static clones of the real Header (mobile controls) + Hero first paint, using the app's own
// Tailwind classes (the compiled bundle CSS is linked on the page), so the pre-hydration paint
// is metrically identical to the hydrated homepage - no width, wrap or spacing differences.
const HOME_PRE = '<main data-prerender data-home>'
+ '<header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-300" role="banner"><div class="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8"><div class="flex h-16 items-center justify-between">'
+ '<div class="flex items-center space-x-2"><a href="/" class="flex items-center gap-2" aria-label="FoundStart Home"><img src="/logo-mark.png" alt="FoundStart logo" class="h-8 w-auto" /><span class="text-xl font-bold gradient-text hidden 2xl:inline">FoundStart</span></a></div>'
+ '<div class="lg:hidden flex items-center space-x-1">'
+ '<span class="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1.5 text-xs font-medium">$ \ud83c\uddfa\ud83c\uddf8</span>'
+ '<span class="inline-flex h-10 w-10 items-center justify-center rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></span>'
+ '<span class="inline-flex h-10 w-10 items-center justify-center rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg></span>'
+ '<span class="inline-flex h-10 w-10 items-center justify-center rounded-md" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg></span>'
+ '</div></div></div></header>'
+ '<section class="relative overflow-hidden bg-[#05050a]">'
+ '<div class="pointer-events-none absolute inset-x-0 bottom-0 h-[75%]"><div class="absolute left-1/2 bottom-[-55%] h-[120%] w-[190%] sm:w-[130%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.55)_0%,rgba(109,40,217,0.28)_38%,transparent_68%)] blur-2xl"></div><div class="absolute left-1/2 bottom-[-62%] h-[120%] w-[170%] sm:w-[115%] -translate-x-1/2 rounded-[50%] border-t border-purple-400/60 shadow-[0_-10px_90px_rgba(168,85,247,0.55)]"></div></div>'
+ '<div class="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 md:pt-24 text-center">'
+ '<p class="mb-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-purple-400">Freelancers \u00b7 E-commerce \u00b7 SaaS</p>'
+ '<h1 class="mx-auto max-w-4xl text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">Open Your Company<br />with FoundStart</h1>'
+ '<p class="mx-auto mt-6 max-w-2xl text-base md:text-lg text-white/60">Register, pay online and track every step from one dashboard. 9 countries, one clear price per company type.</p>'
+ '<div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">'
+ '<a href="/auth?mode=signup" class="inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 w-full sm:w-auto rounded-full bg-purple-600 px-8 text-base font-semibold text-white hover:bg-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.5)]">Register &amp; Start Formation</a>'
+ '<a href="/countries" class="inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 w-full sm:w-auto rounded-full border border-white/25 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10">Countries &amp; prices</a>'
+ '</div>'
+ '<div class="relative mx-auto mt-12 md:mt-16 max-w-4xl" dir="ltr">'
+ '<div class="rounded-t-2xl border border-white/10 border-b-0 bg-[#0c0c14]/95 shadow-[0_-20px_80px_rgba(139,92,246,0.35)] backdrop-blur">'
+ '<div class="flex items-center gap-1.5 border-b border-white/10 px-4 py-3"><span class="h-2.5 w-2.5 rounded-full bg-white/20"></span><span class="h-2.5 w-2.5 rounded-full bg-white/20"></span><span class="h-2.5 w-2.5 rounded-full bg-white/20"></span><span class="mx-auto rounded-md bg-white/5 px-3 py-0.5 text-[10px] text-white/40">foundstart.org/dashboard</span></div>'
+ '<picture><source media="(max-width: 639px)" srcset="/hero/dashboard-m-en.webp" width="560" height="1148" /><img src="/hero/dashboard-en.webp" width="1200" height="712" alt="The real FoundStart dashboard: companies, orders and formation status" class="block w-full max-h-[460px] sm:max-h-none object-cover object-top" loading="eager" fetchpriority="high" decoding="async" /></picture>'
+ '</div></div></div></section></main>';
// Every data-driven article gets a manifest entry so it is prerendered and listed in the sitemap.
for (const [slug, a] of Object.entries(ARTICLES)) {
  const r = "/blog/" + slug;
  if (!manifest[r] && a && a.title) manifest[r] = { title: `${a.title} | FoundStart Blog`, desc: a.description || "", ogt: a.title, ogd: a.description || "", h1: a.title, text: a.description || "" };
}
function setTag(html, re, tag) { return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `  ${tag}\n  </head>`); }
function page(route, m, extra = {}) {
  let h = shell; const url = cfg.site + (route === "/" ? "" : route);
  const title = esc(m.title), desc = esc(m.desc || m.ogd || "");
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  if (desc) h = setTag(h, /<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${desc}" />`);
  h = setTag(h, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}" />`);
  h = setTag(h, /<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${esc(m.ogt || m.title)}" />`);
  if (desc) h = setTag(h, /<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${esc(m.ogd || m.desc)}" />`);
  h = setTag(h, /<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${url}" />`);
  h = setTag(h, /<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${esc(m.ogt || m.title)}" />`);
  if (desc) h = setTag(h, /<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${esc(m.ogd || m.desc)}" />`);
  if (extra.noindex) h = setTag(h, /<meta\s+name="robots"[^>]*>/i, `<meta name="robots" content="noindex, nofollow" />`);
  // The shell's #root is not empty (badge markup), so insert the prerendered main as its
  // first child instead of replacing an empty div. React replaces it client-side on mount.
  const preInner = route === "/" ? HOME_PRE : `<main data-prerender><h1>${esc(m.h1 || m.title)}</h1>${m.text && !extra.skipText ? `<p>${esc(m.text)}</p>` : ""}${extra.bodyHtml || ""}</main>`;
  const cssLink = (h.match(/<link rel="stylesheet"[^>]*href="\/assets\/[^"]*\.css"[^>]*>/) || [''])[0];
  if (cssLink) h = h.replace(cssLink, '');
  h = h.replace(/<head>/i, '<head>' + PRERENDER_CSS + (route === "/" ? HOME_PRE_CSS : "") + cssLink);
  if (route === "/") {
    // Homepage FAQPage schema mirroring the visible HomeFAQ accordion picks (EN). Prices follow src/data/formationCatalog.ts (2026-10-31).
    const FAQ_LD = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How long does it take to form a company?", "acceptedAnswer": {"@type": "Answer", "text": "It depends on the country, the registry and how fast documents are ready. We do not promise a fixed time. After you pay, the status of your order is shown in your dashboard."}}, {"@type": "Question", "name": "Can a non-resident or foreigner own a company abroad?", "acceptedAnswer": {"@type": "Answer", "text": "In most of our countries, yes. Residency or citizenship is not required to own a US LLC or C-Corp, a UK Ltd, an Estonian OÜ and others. Some structures have extra rules (for example, a US S-Corporation is only for US citizens and permanent residents, and an Irish company needs an EEA-resident director or a bond). Each country's requirements are shown before you pay."}}, {"@type": "Question", "name": "How much does company formation cost?", "acceptedAnswer": {"@type": "Answer", "text": "FoundStart service fees in USD: US LLC $450, US C-Corp $550, US S-Corp $750, UK Ltd $500, Estonia OÜ $335, Finland Oy $530, Sweden AB $575, Latvia SIA $1610, Lithuania UAB $1610, Ireland Ltd $1215, Egypt from $249 to $1499 depending on the structure."}}, {"@type": "Question", "name": "How much does it cost to form a US LLC in 2026?", "acceptedAnswer": {"@type": "Answer", "text": "Each state sets its own fee. Wyoming charges $100 to file the articles of organization; Delaware charges $90 for the certificate of formation. Yearly: Wyoming's annual report carries a license tax from $60 (based on assets located in the state), and Delaware charges LLCs a flat $400 annual tax due by 1 June (no annual report filing). A registered agent service is extra. (Official state fee sources, checked November 2, 2026.)"}}, {"@type": "Question", "name": "Can I open a Stripe account from Egypt?", "acceptedAnswer": {"@type": "Answer", "text": "Not directly. Stripe does not currently support businesses registered in Egypt, so Egyptian founders usually form a US, UK or Estonian company first, then open Stripe and a business account under that company."}}, {"@type": "Question", "name": "How do I pay?", "acceptedAnswer": {"@type": "Answer", "text": "Online by card through Stripe's secure checkout. FoundStart never sees your card number."}}, {"@type": "Question", "name": "Does FoundStart open a bank account for me?", "acceptedAnswer": {"@type": "Answer", "text": "Opening a company does not automatically include a bank account. Banks and payment providers decide on each application themselves and FoundStart cannot guarantee approval."}}, {"@type": "Question", "name": "Which countries can I open a company in with FoundStart?", "acceptedAnswer": {"@type": "Answer", "text": "9 countries: United States, United Kingdom, Estonia, Finland, Sweden, Latvia, Lithuania, Ireland and Egypt."}}]};
    h = h.replace("</head>", `  <script type="application/ld+json">${JSON.stringify(FAQ_LD)}</script>
  </head>`);
  }
  return h.replace(/<div id="root">/, "<div id=\"root\">" + preInner);
}
let n = 0;
for (const [route, m] of Object.entries(manifest)) {
  if (!m || !m.title) continue;
  const extra = {};
  const bm = route.match(/^\/blog\/([a-z0-9-]+)$/);
  if (bm && ARTICLES[bm[1]] && ARTICLES[bm[1]].html) extra.bodyHtml = `<article>${ARTICLES[bm[1]].html}</article>`;
  if (route === "/faq" && faqHtml) { extra.bodyHtml = faqHtml; extra.skipText = true; }
  const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, page(route, m, extra)); n++;
}
fs.writeFileSync(path.join(dist, "404.html"), page("/404", { title: "Page not found | " + cfg.name, desc: "This page does not exist.", h1: "Page not found" }, { noindex: true }).replace(/<link rel="canonical"[^>]*>\s*/, ""));
const urls = Object.keys(manifest).filter((r) => manifest[r] && manifest[r].title && !(cfg.sitemapExclude || []).some((p) => r.startsWith(p)));
fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((r) => `  <url><loc>${cfg.site}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
if (fs.existsSync(path.join(dist, "sitemap.txt"))) fs.writeFileSync(path.join(dist, "sitemap.txt"), urls.map((r) => cfg.site + (r === "/" ? "/" : r)).join("\n") + "\n");
console.log(`postbuild: ${n} pages, ${urls.length} in sitemap`);
