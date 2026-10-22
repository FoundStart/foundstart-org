// Only product-specific listing URLs verified before release belong here.
// Pending listings stay out of the rendered footer until a public URL is available.
const launchLinks: { name: string; href: string; icon: string }[] = [
  {
    "name": "Product Hunt",
    "href": "https://www.producthunt.com/products/foundstart?launch=foundstart-2-0",
    "icon": "ph"
  },
  {
    "name": "LaunchBuff",
    "href": "https://launchbuff.com/products/foundstart-1mmzs2",
    "icon": "launch"
  }
];

export function LaunchBadges({ isRTL = false }: { isRTL?: boolean }) {
  if (!launchLinks.length) return null;
  return (
    <nav aria-label={isRTL ? "صفحات الإطلاق" : "Launch listings"} dir={isRTL ? "rtl" : "ltr"}
      style={{ padding: "20px 0", textAlign: "start" }}>
      <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, opacity: .7 }}>
        {isRTL ? "اكتشفنا على" : "Find us on"}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {launchLinks.map(({ name, href, icon }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer"
            aria-label={`${name} (${isRTL ? "نافذة جديدة" : "opens in a new tab"})`}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44,
              padding: "8px 12px", border: "1px solid currentColor", borderRadius: 10,
              textDecoration: "none", color: "inherit", fontSize: 13, fontWeight: 600 }}>
            {icon === "ph" ? <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#da552f"/><path fill="white" d="M8 6h5a4 4 0 0 1 0 8h-2v4H8V6zm3 3v2h2a1 1 0 0 0 0-2h-2z"/></svg> :
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 5c3-2 6-2 6-2s0 3-2 6l-6 7-5-5 7-6Z"/><circle cx="15" cy="8" r="1.5"/><path d="m7 11-4 1 3 3m6 1-1 5-3-3m-2 0-3 3"/></svg>}
            <span dir="ltr">{name}</span>
          </a>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10, alignItems: "center" }}>
          <a href="https://1000tools.best/projects/foundstart-8720?utm_source=badge" target="_blank" rel="noopener noreferrer"><img src="https://1000tools.best/images/badges/featured-on-dark.svg" alt="Featured on 1000 Tools" style={{ height: 44, width: "auto" }} /></a>
          <a href="https://devhub.best/projects/foundstart?utm_source=badge" target="_blank" rel="noopener noreferrer"><img src="https://r2.direasy-multi-tenant.focusapps.app/uploads/616d0b1a-3979-4b8c-94d1-b4f1fedd3ead/1783239705242/q5ooy1np7e/featured-on-dark.svg" alt="Featured on DevHub" style={{ height: 44, width: "auto" }} /></a>
      </div>
    </nav>
  );
}
