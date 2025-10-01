
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import JurisdictionSelector from '@/components/JurisdictionSelector';
import ServiceIntegrations from '@/components/ServiceIntegrations';

import Footer from '@/components/Footer';
import BusinessNameWidget from '@/components/BusinessNameWidget';
import ComingSoonCards from '@/components/ComingSoonCards';
import AIChatBot from '@/components/AIChatBot';
import { useTranslation } from '@/contexts/TranslationContext';

const Index = () => {
  const { t, isRTL } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main content with proper mobile spacing */}
      <main className="pb-20 md:pb-0">
        <Hero />
        
        {/* Option 1: Partner Links Section */}
        <JurisdictionSelector />
        
        
        {/* Business Name Widget Section */}
        <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className={`space-y-4 mb-8 md:mb-12 ${isRTL ? 'text-right' : 'text-center'}`}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {t.findPerfectName} <span className="gradient-text">{t.businessName}</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t.businessNameDescription}
              </p>
            </div>
            <BusinessNameWidget />
          </div>
        </section>
        
        <ServiceIntegrations />
        {/* Partner Grid replaces AI Features/Wizard */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="gradient-text">Direct Partners Access</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Access our curated partner platforms directly for specialized services including company formation, banking, eSIM, and more.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { category: "Business Company Formation", platform: "FoundStart", url: "https://foundstart.vercel.app/", niche: "Company formation in USA & Europe" },
                { category: "Business Company Formation", platform: "Privatily", url: "https://privatily.com/ref/Deeemoz/", niche: "Company formation in USA-UK" },
                { category: "Business Company Formation", platform: "ITIN", url: "https://theitin.com/ref/80", niche: "Company formation in USA" },
                { category: "Business Company Formation", platform: "Clemta", url: "https://clemta.com/?ref=njbhzwf", niche: "Company formation in USA" },
                { category: "Business Company Formation", platform: "Startglobal", url: "http://startglobal.co/?via=mohamed-sayed", niche: "Company formation in USA" },
                { category: "Business Company Formation", platform: "Doola", url: "https://partnersps.doola.com/yukcm0gd526a", niche: "Company formation in USA" },
                { category: "Business Company Formation", platform: "Tailorbrands", url: "https://tailorbrands.go2cloud.org/aff_ad?campaign_id=77&aff_id=9476", niche: "Company formation in USA" },
                { category: "Business Company Formation", platform: "Firstbase", url: "https://firstbase.pxf.io/RGaDzX", niche: "Company formation in UK" },
                { category: "Business Company Formation", platform: "1stFormations", url: "https://1st-formations-limited.sjv.io/4GKB30", niche: "Company formation in UK" },
                { category: "Business Company Formation", platform: "Rapid Formation", url: "https://rapid-formations.sjv.io/XmEo53", niche: "Company formation in UK" },
                { category: "Business Company Formation", platform: "Estonia", url: "https://my1office.co/en/company/register?ref=mdzknzu", niche: "Company formation in Estonia & get digital SAAS Visa" },
                { category: "Business Company Formation", platform: "Finland", url: "https://my1office.co/en/company/register?ref=mdzknzu", niche: "Company formation in Finland & get digital SAAS Visa" },
                { category: "Business Company Formation", platform: "Sweden", url: "https://my1office.co/en/company/register?ref=mdzknzu", niche: "Company formation in Sweden & get digital SAAS Visa" },
                { category: "Business Company Formation", platform: "Latvia", url: "https://my1office.co/en/company/register?ref=mdzknzu", niche: "Company formation in Latvia & get digital SAAS Visa" },
                { category: "Business Company Formation", platform: "Lithuania", url: "https://my1office.co/en/company/register?ref=mdzknzu", niche: "Company formation in Lithuania & get digital SAAS Visa" },
                { category: "Telecommunication", platform: "esim me", url: "https://esim.me/esim-me-card-for-android?tracking=uNTexiT4sVLlxvvReENXMkAuUAMnyL60fRxBqMvmfSfUMUYCd6vNYXOsTKfmyWtB", niche: "eSIM your eSIM anywhere anytime" },
                { category: "Telecommunication", platform: "SMS Fast", url: "https://smsfast.com/?ref=2414", niche: "Buy a virtual phone number & esim" },
                { category: "Telecommunication", platform: "Bnesim", url: "https://bnes.im/PHV3", niche: "Bnesim your eSIM anywhere anytime" },
                { category: "Fintech", platform: "Wise", url: "https://wise.com/invite/u/mohamedsayeda7", niche: "Bank/Wallet" },
                { category: "Fintech", platform: "Mercury", url: "https://mercury.com/r/deeemoz-llc", niche: "USA Bank" },
                { category: "Fintech", platform: "WorldFirst", url: "https://www.worldfirst.com/global/", niche: "Global Bank" },
                { category: "Fintech", platform: "Airtm", url: "https://app.airtm.com/ivt/msa2023", niche: "Bank/Wallet" },
                { category: "Fintech", platform: "Payeer", url: "https://payeer.com/?session=29670378", niche: "Digital Wallet" },
                { category: "Fintech", platform: "Novel bank", url: "https://trynovel.com/?lmref=HaLvsA", niche: "Bank/Wallet" },
                { category: "Fintech", platform: "Refresh me", url: "https://get.refresh.me/0jswhxxxuxd4", niche: "The all-in-one personal financial management tool" }
              ].map((partner, index) => (
                <div
                  key={index}
                  className="group relative bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {partner.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {partner.platform}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {partner.niche}
                    </p>
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Visit Platform →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Coming Soon Section */}
        <ComingSoonCards />
      </main>
      
      <Footer />
      
      {/* AI Chat Bot */}
      <AIChatBot />
    </div>
  );
};

export default Index;
