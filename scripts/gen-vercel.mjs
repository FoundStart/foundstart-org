// Regenerates vercel.json from the routes declared in src/App.tsx.
// Known client routes fall back to the SPA shell; any other URL gets the real 404 page (status 404).
import fs from "node:fs";
const app = fs.readFileSync("src/App.tsx", "utf8");
const paths = [...new Set([...app.matchAll(/path=\{?[`"']([^`"']+)[`"']/g)].map((m) => m[1]))];
const extra = JSON.parse(fs.existsSync("scripts/seo-config.json") ? fs.readFileSync("scripts/seo-config.json", "utf8") : "{}").extraRoutes || [];
const rules = new Set();
for (let p of [...paths, ...extra]) {
  if (p === "*" || p === "/" || p.includes("${")) continue;
  p = p.replace(/\/\*$/, "/:path*");
  rules.add(p);
}
const rewrites = [...rules].sort().map((source) => ({ source, destination: "/index.html" }));
fs.writeFileSync("vercel.json", JSON.stringify({ $schema: "https://openapi.vercel.sh/vercel.json", rewrites }, null, 2) + "\n");
console.log(rewrites.length, "rewrites");
