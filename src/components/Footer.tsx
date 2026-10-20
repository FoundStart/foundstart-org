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
      { name: L("AI Agents", "وكلاء الذكاء الاصطناعي"), href: "/agents" },
      { name: L("Premium Domains", "الدومينات المميزة"), href: "/domains" },
      { name: L("Pricing", "الأسعار"), href: "/pricing" }
    ]
  }, {
    title: L("Countries", "الدول"),
    links: [
      { name: L("🇺🇸 United States", "🇺🇸 الولايات المتحدة"), href: "/country/USA" },
      { name: L("🇬🇧 United Kingdom", "🇬🇧 المملكة المتحدة"), href: "/country/UK" },
      { name: L("🇨🇦 Canada", "🇨🇦 كندا"), href: "/country/CA" },
      { name: L("🇪🇪 Estonia", "🇪🇪 إستونيا"), href: "/country/EE" },
      { name: L("🇫🇮 Finland", "🇫🇮 فنلندا"), href: "/country/FI" },
      { name: L("🇸🇪 Sweden", "🇸🇪 السويد"), href: "/country/SE" },
      { name: L("🇱🇻 Latvia", "🇱🇻 لاتفيا"), href: "/country/LV" },
      { name: L("🇱🇹 Lithuania", "🇱🇹 ليتوانيا"), href: "/country/LT" },
      { name: L("All Countries", "كل الدول"), href: "/countries" }
    ]
  }, {
    title: L("Partners", "الشركاء"),
    links: [
      { name: L("All Partners", "كل الشركاء"), href: "/all-partners" },
      { name: L("Formation Partners", "شركاء التأسيس"), href: "/partners" },
      { name: L("Digital Partners", "الشركاء الرقميون"), href: "/digital-partners" },
      { name: L("Freelancer Partners", "شركاء المستقلين"), href: "/freelancer-partners" }
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
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="flex items-center gap-2"><img src="/logo-mark.png" alt="FoundStart logo" className="h-7 w-auto" /><span className="text-lg font-bold gradient-text">FoundStart</span></span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              {L("Launch your business in minutes, not months. The all-in-one platform for company formation, banking, and digital services.","أطلق شركتك في دقائق لا شهور. منصة واحدة لتأسيس الشركات والبنوك والخدمات الرقمية.")}
            </p>
            
            
            
            <div className="text-xs text-muted-foreground">{L("© 2026 FoundStart. All rights reserved, MoMoAI","© 2026 FoundStart. جميع الحقوق محفوظة، MoMoAI")}</div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {(link as any).external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
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

          <div className="flex items-center">
            <a href="https://launchbuff.com/products/foundstart-1mmzs2" target="_blank" rel="noopener noreferrer" title="Featured on LaunchBuff">
              <img src="https://launchbuff.com/badge-featured-dark.svg" alt="Featured on LaunchBuff" width="128" height="40" loading="lazy" className="opacity-80 hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
