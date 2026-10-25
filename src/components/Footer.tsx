import { LaunchBadges } from "@/components/LaunchBadges";
import { waLink } from '@/lib/whatsapp';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/contexts/TranslationContext';


const Footer = () => {
  const { isRTL } = useTranslation();
  const L = (en: string, ar: string) => (isRTL ? ar : en);
  const footerSections = [{
    title: L("Services", "الخدمات"),
    links: [
      { name: L("All Services", "كل الخدمات"), href: "/services" },
      { name: L("Company Formation", "تأسيس الشركات"), href: "/company-formation-bio" },
      { name: L("Digital Services", "خدمات رقمية"), href: "/digital-services" },
      { name: L("Domains", "الدومينات"), href: "/domains" },
      { name: L("Pricing", "الأسعار"), href: "/pricing" },
      { name: L("Payment & Fintech", "الدفع والفينتك"), href: "/fintech" },
      { name: L("All Partners", "كل الشركاء"), href: "/all-partners" },
      { name: L("Formation Partners", "شركاء التأسيس"), href: "/partners" },
      { name: L("Digital Partners", "الشركاء الرقميون"), href: "/digital-partners" },
      { name: L("Freelancer Partners", "شركاء المستقلين"), href: "/freelancer-partners" }
    ]
  }, {
    title: L("Countries", "الدول"),
    links: [
      { name: L("United States", "الولايات المتحدة"), href: "/country/USA", flag: "us" },
      { name: L("United Kingdom", "المملكة المتحدة"), href: "/country/UK", flag: "gb" },
      { name: L("Canada", "كندا"), href: "/country/CA", flag: "ca" },
      { name: L("Estonia", "إستونيا"), href: "/country/EE", flag: "ee" },
      { name: L("Finland", "فنلندا"), href: "/country/FI", flag: "fi" },
      { name: L("Sweden", "السويد"), href: "/country/SE", flag: "se" },
      { name: L("Latvia", "لاتفيا"), href: "/country/LV", flag: "lv" },
      { name: L("Lithuania", "ليتوانيا"), href: "/country/LT", flag: "lt" },
      { name: L("All Countries", "كل الدول"), href: "/countries" }
    ]
  }, {
    title: L("Products", "منتجاتنا"),
    links: [
      { name: 'Namelizer', href: 'https://namelizer.com', external: true },
      { name: 'HeyKeyword', href: 'https://heykeyword.com', external: true },
      { name: 'Shortet', href: 'https://shortet.com', external: true },
      { name: 'ClotheCart', href: 'https://clothecart.com', external: true },
      { name: 'Cartgy', href: 'https://cartgy.com', external: true },
      { name: 'Tafsirly', href: 'https://tafsirly.com', external: true },
      { name: 'YesShoot', href: 'https://yesshoot.com', external: true },
      { name: 'Toolstogethers', href: 'https://toolstogethers.com', external: true },
      { name: 'Hosstec', href: 'https://hosstec.com', external: true }
      ,{ name: L('Launch your shop', 'ابدأ متجرك'), href: 'https://link.fourthwall.com/join/cartgy', external: true, rel: 'nofollow sponsored' }
    ]
  }, {
    title: L("Resources", "المصادر"),
    links: [
      { name: L("Blog", "المدونة"), href: "/blog" },
      { name: L("Press & News", "الأخبار والصحافة"), href: "/press" },
      { name: L("Learning", "التعلم"), href: "/learning" },
      { name: L("Media & Videos", "الوسائط والفيديو"), href: "/media" },
      { name: L("Affiliate Program", "برنامج الأفلييت"), href: "/affiliates" },
      { name: L("Tutorials", "الشروحات"), href: "/tutorials" },
      { name: L("Business Name Generator", "مولّد أسماء الشركات"), href: "/business-name-generator" },
      { name: L("Digital Nomad Visas", "تأشيرات الرحّالة الرقميين"), href: "/digital-nomad-visas" }
    ]
  }, {
    title: L("Support", "الدعم"),
    links: [
      { name: L("FAQ", "الأسئلة الشائعة"), href: "/faq" },
      { name: L("Contact Us", "تواصل معنا"), href: "/contact-us" },
      { name: L("Live Chat (WhatsApp)", "دردشة مباشرة (واتساب)"), href: waLink(isRTL), external: true },
      { name: L("Who We Are", "من نحن"), href: "/who-we-are" }
    ]
  }];



  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="flex items-center gap-2"><img src="/logo-mark.png" alt="FoundStart logo" className="h-7 w-auto" /><span className="text-lg font-bold gradient-text">FoundStart</span></span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              {L("Company formation in 10 countries, with one clear FoundStart price per company type.","تأسيس الشركات في 10 دول، بسعر واضح من FoundStart لكل نوع شركة.")}
            </p>
            
            
            
            <div className="text-xs text-muted-foreground">{L("© 2026 FoundStart. All rights reserved, MoMoAI","© 2026 FoundStart. جميع الحقوق محفوظة، MoMoAI")}</div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index} className={section.title === L("Products", "منتجاتنا") ? "md:col-span-2" : ""}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className={section.title === L("Products", "منتجاتنا") ? "grid grid-cols-2 gap-x-4 gap-y-2" : "space-y-2"}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {(link as any).external ? (
                      <a href={link.href} target="_blank" rel={(link as any).rel ?? "noopener noreferrer"} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-2">
                        {(link as any).flag && <img src={`https://flagcdn.com/w20/${(link as any).flag}.png`} alt="" width={20} height={14} loading="lazy" className="inline-block h-3.5 w-5 rounded-[2px] object-cover" />}
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <LaunchBadges isRTL={isRTL} />

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">{L("Privacy Policy", "سياسة الخصوصية")}</Link>
            <Link to="/terms-of-service" className="hover:text-foreground transition-colors">{L("Terms of Service", "شروط الخدمة")}</Link>
            <Link to="/cookie-policy" className="hover:text-foreground transition-colors">{L("Cookie Policy", "سياسة الكوكيز")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
