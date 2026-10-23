// "Partners" block for site footers: all ten Deeemoz sites in two columns.
const PARTNER_SITES: { key: string; name: string; href: string }[] = [
  { key: "foundstart", name: "FoundStart", href: "https://www.foundstart.org" },
  { key: "heykeyword", name: "HeyKeyword", href: "https://heykeyword.com" },
  { key: "namelizer", name: "Namelizer", href: "https://www.namelizer.com" },
  { key: "shortet", name: "Shortet", href: "https://shortet.com" },
  { key: "cartgy", name: "Cartgy", href: "https://cartgy.com" },
  { key: "clothecart", name: "ClotheCart", href: "https://clothecart.com" },
  { key: "tafsirly", name: "Tafsirly", href: "https://tafsirly.com" },
  { key: "yesshoot", name: "YesShoot", href: "https://yesshoot.com" },
  { key: "toolstogethers", name: "Toolstogethers", href: "https://toolstogethers.com" },
  { key: "hosstec", name: "Hosstec", href: "https://hosstec.com" },
];

export function PartnerSites({ isRTL = false, self }: { isRTL?: boolean; self: string }) {
  const title = isRTL ? "شركاؤنا" : "Partners";
  return (
    <nav aria-label={title} dir={isRTL ? "rtl" : "ltr"} className="py-5 border-t border-border mt-2 text-start">
      <p className="text-xs font-semibold text-muted-foreground mb-3">{title}</p>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 max-w-md">
        {PARTNER_SITES.map(({ key, name, href }) => (
          <li key={key}>
            {key === self ? (
              <span aria-current="page" className="text-sm font-semibold text-foreground">{name}</span>
            ) : (
              <a href={href} target="_blank" rel="noopener" dir="ltr" className="text-sm text-muted-foreground hover:text-primary transition-colors">{name}</a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
