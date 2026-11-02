const PRERENDER_CSS = '<script>window.__fsPrerender=true;try{var t=localStorage.getItem("theme");if(t==="dark"||((!t||t==="system")&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}</script><style>html:has(#root>main[data-prerender]),html:has(#root>main[data-prerender]) body{background:#0e0a1b!important}#root>main[data-prerender]{max-width:768px;margin:0 auto;padding:110px 24px 70px;color:#e8ecf3;line-height:1.75;font-family:Inter,system-ui,-apple-system,sans-serif}#root>main[data-prerender] h1{font-size:1.9rem;line-height:1.25;margin:0 0 16px}#root>main[data-prerender] h2{font-size:1.35rem;margin:30px 0 10px}#root>main[data-prerender] h3{font-size:1.1rem;margin:22px 0 6px}#root>main[data-prerender] p{margin:0 0 14px}#root>main[data-prerender] a{color:#60a5fa}#root>main[data-prerender] img{max-width:100%;height:auto}#root>main[data-prerender] section{margin:0 0 26px}</style>';
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
const HOME_PRE_CSS = '<style>html:has(#root>main[data-prerender][data-home]),html:has(#root>main[data-prerender][data-home]) body{background:#05050a!important}#root>main[data-prerender][data-home]{max-width:none;margin:0;padding:0;background:#05050a;color:#fff;line-height:1.6;font-family:Inter,system-ui,-apple-system,sans-serif;overflow:hidden}#root>main[data-prerender][data-home] .ph{position:relative;text-align:center;padding:96px 16px 0;max-width:72rem;margin:0 auto;background:radial-gradient(ellipse 90% 55% at 50% 100%,rgba(139,92,246,.45),rgba(109,40,217,.22) 40%,transparent 70%)}#root>main[data-prerender][data-home] .pk{font-size:.78rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#c084fc;margin:0 0 20px}#root>main[data-prerender][data-home] h1{font-size:clamp(2.6rem,7vw,4.5rem);line-height:1.05;font-weight:800;letter-spacing:-.02em;color:#fff;margin:0}#root>main[data-prerender][data-home] .ps{max-width:42rem;margin:24px auto 0;color:rgba(255,255,255,.6);font-size:1.05rem}#root>main[data-prerender][data-home] .pc{margin-top:32px;display:flex;flex-wrap:wrap;gap:12px;justify-content:center}#root>main[data-prerender][data-home] .pc a{display:inline-block;height:48px;line-height:48px;padding:0 32px;border-radius:9999px;font-weight:600;font-size:1rem;text-decoration:none;color:#fff}#root>main[data-prerender][data-home] .pc a.pb{background:#9333ea;box-shadow:0 0 30px rgba(147,51,234,.5)}#root>main[data-prerender][data-home] .pc a.po{border:1px solid rgba(255,255,255,.25)}#root>main[data-prerender][data-home] .pm{position:relative;max-width:56rem;margin:48px auto 0;border:1px solid rgba(255,255,255,.1);border-bottom:0;border-radius:16px 16px 0 0;background:rgba(12,12,20,.95);box-shadow:0 -20px 80px rgba(139,92,246,.35);overflow:hidden}#root>main[data-prerender][data-home] .pmb{display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,.1);padding:12px 16px}#root>main[data-prerender][data-home] .pmb i{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.2)}#root>main[data-prerender][data-home] .pmb span{margin:0 auto;border-radius:6px;background:rgba(255,255,255,.05);padding:2px 12px;font-size:10px;color:rgba(255,255,255,.4)}#root>main[data-prerender][data-home] .pm img{display:block;width:100%;max-height:460px;object-fit:cover;object-position:top;height:auto}</style>';
// Static clone of the real Hero first paint (src/components/Hero.tsx, default EN locale) so the
// pre-hydration paint already looks like the homepage - no stripped text page flash.
const HOME_PRE = '<main data-prerender data-home><div class="ph"><p class="pk">Freelancers \u00b7 E-commerce \u00b7 SaaS</p><h1>Open Your Company<br>with FoundStart</h1><p class="ps">Register, pay online and track every step from one dashboard. 9 countries, one clear price per company type.</p><div class="pc"><a class="pb" href="/auth?mode=signup">Register &amp; Start Formation</a><a class="po" href="/countries">Countries &amp; prices</a></div><div class="pm"><div class="pmb"><i></i><i></i><i></i><span>foundstart.org/dashboard</span></div><picture><source media="(max-width: 639px)" srcset="/hero/dashboard-m-en.webp" width="560" height="1148"><img src="/hero/dashboard-en.webp" width="1200" height="712" alt="The real FoundStart dashboard: companies, orders and formation status" fetchpriority="high" decoding="async"></picture></div></div></main>';
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
