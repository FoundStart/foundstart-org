
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import JurisdictionSelector from '@/components/JurisdictionSelector';
import ServiceIntegrations from '@/components/ServiceIntegrations';
import Footer from '@/components/Footer';
import BusinessNameWidget from '@/components/BusinessNameWidget';
import ComingSoonCards from '@/components/ComingSoonCards';
import AIChatBot from '@/components/AIChatBot';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Building2, Globe, Shield, CheckCircle, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { t, isRTL, language } = useTranslation();
  
  const formationPartners = [
    { platform: "FoundStart", url: "https://foundstart.vercel.app/", niche: "USA & Europe", countries: ["🇺🇸", "🇬🇧", "🇪🇺"] },
    { platform: "Privatily", url: "https://privatily.com/ref/Deeemoz/", niche: "USA-UK", countries: ["🇺🇸", "🇬🇧"] },
    { platform: "ITIN", url: "https://theitin.com/ref/80", niche: "USA", countries: ["🇺🇸"] },
    { platform: "Clemta", url: "https://clemta.com/?ref=njbhzwf", niche: "USA", countries: ["🇺🇸"] },
    { platform: "Startglobal", url: "http://startglobal.co/?via=mohamed-sayed", niche: "USA", countries: ["🇺🇸"] },
    { platform: "Doola", url: "https://partnersps.doola.com/yukcm0gd526a", niche: "USA", countries: ["🇺🇸"] },
    { platform: "Tailorbrands", url: "https://tailorbrands.go2cloud.org/aff_ad?campaign_id=77&aff_id=9476", niche: "USA", countries: ["🇺🇸"] },
    { platform: "Firstbase", url: "https://firstbase.pxf.io/RGaDzX", niche: "USA", countries: ["🇺🇸"] },
    { platform: "1stFormations", url: "https://1st-formations-limited.sjv.io/4GKB30", niche: "UK", countries: ["🇬🇧"] },
    { platform: "Rapid Formation", url: "https://rapid-formations.sjv.io/XmEo53", niche: "UK", countries: ["🇬🇧"] },
    { platform: "My1Office", url: "https://my1office.co/en/company/register?ref=mdzknzu", niche: "Baltic & Nordic", countries: ["🇪🇪", "🇫🇮", "🇸🇪", "🇱🇻", "🇱🇹"] },
  ];

  const services = [
    { icon: Building2, title: "Company Formation", description: "LLC, C-Corp, Ltd formation in 9+ jurisdictions" },
    { icon: Globe, title: "Banking Solutions", description: "Mercury, Wise, WorldFirst business accounts" },
    { icon: Shield, title: "Compliance", description: "Registered agent & annual filings" },
  ];

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      <Header />
      
      <main className="pb-20 md:pb-0 w-full max-w-full">
        <Hero />
        
        {/* Quick Stats */}
        <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {[
                { value: "9+", label: "Jurisdictions" },
                { value: "370+", label: "Partners" },
                { value: "5-10min", label: "Setup Time" },
                { value: "100%", label: "Compliance" },
              ].map((stat, index) => (
                <div key={index} className="p-4">
                  <div className="text-2xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? 'خدمات تأسيس الشركات' : 'Company Formation Services'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'كل ما تحتاجه لبدء عملك في الولايات المتحدة وأوروبا'
                  : 'Everything you need to start your business in the USA & Europe'
                }
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {services.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                  <CardHeader>
                    <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link to="/countries">
                  {language === 'ar' ? 'ابدأ الآن' : 'Start Your Business'}
                  <ArrowRight className={`w-5 h-5 ml-2 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <JurisdictionSelector />
        
        {/* Business Name Widget */}
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

        {/* Formation Partners Grid */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold">
                <span className="gradient-text">Formation Partners</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Access our curated partner platforms directly for company formation in USA, UK, and Europe.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {formationPartners.map((partner, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {partner.countries.map((flag, i) => (
                            <span key={i} className="text-lg">{flag}</span>
                          ))}
                        </div>
                        <Badge variant="secondary" className="text-xs">{partner.niche}</Badge>
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {partner.platform}
                      </h3>
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Visit Platform →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link to="/partners">
                  View All Partners
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials/Trust Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Why Choose FoundStart?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted by entrepreneurs worldwide for seamless company formation
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Star, title: "Trusted Partners", description: "Vetted formation services across 9 jurisdictions" },
                { icon: Users, title: "Expert Support", description: "24/7 assistance throughout your formation journey" },
                { icon: CheckCircle, title: "100% Compliant", description: "All filings handled correctly the first time" },
              ].map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <feature.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <ComingSoonCards />
      </main>
      
      <Footer />
      <AIChatBot />
    </div>
  );
};

export default Index;