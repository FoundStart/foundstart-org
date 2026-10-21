const PRERENDER_CSS = '<script>try{var t=localStorage.getItem("theme");if(t==="dark"||((!t||t==="system")&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}</script><style>html:has(#root>main[data-prerender]){background:#0e0a1b}#root:has(>main[data-prerender])::before{border-color:#334155!important;border-top-color:#60a5fa!important}#root>main[data-prerender]{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}#root:has(>main[data-prerender])::before{content:"";display:block;width:28px;height:28px;margin:45vh auto 0;border:3px solid #334155;border-top-color:#60a5fa;border-radius:50%;animation:fsspin .8s linear infinite}@keyframes fsspin{to{transform:rotate(360deg)}}</style>';
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
  const body = `<div id="root"><main data-prerender><h1>${esc(m.h1 || m.title)}</h1>${m.text ? `<p>${esc(m.text)}</p>` : ""}</main></div>`;
  h = h.replace(/<head>/i, '<head>' + PRERENDER_CSS);
  return h.replace(/<div id="root">\s*<\/div>/, body);
}
let n = 0;
for (const [route, m] of Object.entries(manifest)) {
  if (!m || !m.title) continue;
  const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, page(route, m)); n++;
}
fs.writeFileSync(path.join(dist, "404.html"), page("/404", { title: "Page not found | " + cfg.name, desc: "This page does not exist.", h1: "Page not found" }, { noindex: true }).replace(/<link rel="canonical"[^>]*>\s*/, ""));
const urls = Object.keys(manifest).filter((r) => manifest[r] && manifest[r].title && !(cfg.sitemapExclude || []).some((p) => r.startsWith(p)));
fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((r) => `  <url><loc>${cfg.site}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
if (fs.existsSync(path.join(dist, "sitemap.txt"))) fs.writeFileSync(path.join(dist, "sitemap.txt"), urls.map((r) => cfg.site + (r === "/" ? "/" : r)).join("\n") + "\n");
console.log(`postbuild: ${n} pages, ${urls.length} in sitemap`);
