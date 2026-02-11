import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import BusinessNameWidget from '@/components/BusinessNameWidget';
import EntitySelector from '@/components/EntitySelector';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, Building2, Globe, Shield, CheckCircle, Star, Users, CreditCard, Mail, Server, Smartphone, Wifi, Gift, Search, Brain, Target, TrendingUp, Briefcase, FileText, Users2, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { t, isRTL, language } = useTranslation();
  
  // Core services offered by FoundStart
  const coreServices = [
    {
      icon: Building2,
      title: "Company Formation",
      description: "LLC, Corp, Ltd formation in USA, UK, Canada, Estonia, Finland, Sweden, Latvia, Lithuania & Egypt",
      link: "/countries",
      color: "bg-blue-500"
    },
    {
      icon: Globe,
      title: "Domain Registration",
      description: "Premium .com, .net, .org domains with SSL certificates and 170+ domains for sale",
      link: "/domains",
      color: "bg-green-500"
    },
    {
      icon: Server,
      title: "Web Hosting",
      description: "Premium cloud hosting with 99.9% uptime, free SSL, and automatic backups",
      link: "/services",
      color: "bg-purple-500"
    },
    {
      icon: Mail,
      title: "Business Email",
      description: "Professional email accounts with custom domains for your business",
      link: "/services",
      color: "bg-orange-500"
    },
    {
      icon: TrendingUp,
      title: "Website Platform",
      description: "SAAS-ready website solutions, e-commerce, and custom development",
      link: "/services",
      color: "bg-pink-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Android, iOS & Harmony apps for your business",
      link: "/services",
      color: "bg-indigo-500"
    },
    {
      icon: CreditCard,
      title: "Business Banking",
      description: "Mercury, Wise, WorldFirst, and Neo banking solutions",
      link: "/services",
      color: "bg-cyan-500"
    },
    {
      icon: CreditCard,
      title: "Virtual Cards",
      description: "Visa & Mastercard virtual cards for online payments",
      link: "/services",
      color: "bg-teal-500"
    },
    {
      icon: Wifi,
      title: "eSIM Cards",
      description: "Global eSIM connectivity for digital nomads",
      link: "/digital-nomad-visas",
      color: "bg-emerald-500"
    },
    {
      icon: Gift,
      title: "Gift Cards",
      description: "Digital gift card platform for rewards and payments",
      link: "/services",
      color: "bg-red-500"
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Traditional SEO, local SEO, and search engine marketing",
      link: "/seo-management",
      color: "bg-blue-600"
    },
    {
      icon: Brain,
      title: "AI & LLMO",
      description: "LLM optimization for AI visibility and AEO services",
      link: "/seo-management",
      color: "bg-purple-600"
    },
    {
      icon: Target,
      title: "GEO & AEO",
      description: "Geographic and Answer Engine optimization",
      link: "/seo-management",
      color: "bg-orange-600"
    },
    {
      icon: Users2,
      title: "Remote Hiring",
      description: "Virtual assistants, data entry, customer support, and more",
      link: "/freelancer-partners",
      color: "bg-indigo-600"
    },
    {
      icon: FileText,
      title: "AI Documents",
      description: "AI-powered business plan, contracts, and legal documents",
      link: "/dashboard/ai-assistant",
      color: "bg-pink-600"
    }
  ];

  const stats = [
    { value: "9+", label: "Jurisdictions" },
    { value: "170+", label: "Premium Domains" },
    { value: "15+", label: "Services" },
    { value: "5-10min", label: "Setup Time" },
  ];

  const whyChooseUs = [
    { icon: Star, title: "All-in-One Platform", description: "Everything from formation to marketing in one place" },
    { icon: Users, title: "Expert Support", description: "24/7 assistance throughout your business journey" },
    { icon: CheckCircle, title: "100% Compliant", description: "All filings and registrations handled correctly" },
  ];

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      <Header />
      
      <main className="pb-20 md:pb-0 w-full max-w-full">
        <Hero />
        
        {/* Entity Selector */}
        <EntitySelector />
        
        {/* Quick Stats */}
        <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="p-4">
                  <div className="text-2xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Services Grid */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? 'خدماتنا الشاملة' : 'Our Comprehensive Services'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {language === 'ar' 
                  ? 'كل ما تحتاجه لبدء وتوسيع أعمالك - من تأسيس الشركات إلى التسويق الرقمي'
                  : 'Everything you need to start and scale your business - from company formation to digital marketing'
                }
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {coreServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link to={service.link} key={index}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 cursor-pointer">
                      <CardContent className="p-4">
                        <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center mb-3`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link to="/services">
                  {language === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}
                  <ArrowRight className={`w-5 h-5 ml-2 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

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

        {/* Quick Actions / CTA Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow border-primary/20">
                <CardContent className="pt-8 pb-6">
                  <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Start Your Company</h3>
                  <p className="text-muted-foreground mb-4 text-sm">Form LLC or Corp in USA, UK, or Europe in minutes</p>
                  <Button asChild className="w-full">
                    <Link to="/countries">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow border-primary/20">
                <CardContent className="pt-8 pb-6">
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Find Your Domain</h3>
                  <p className="text-muted-foreground mb-4 text-sm">Browse 170+ premium domains or search across 16+ platforms</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/domains">Browse Domains</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow border-primary/20">
                <CardContent className="pt-8 pb-6">
                  <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Calculate Pricing</h3>
                  <p className="text-muted-foreground mb-4 text-sm">Get exact pricing for your company formation needs</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/pricing-calculator">Calculate Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Why Choose FoundStart */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Why Choose FoundStart?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted by entrepreneurs worldwide for seamless business solutions
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {whyChooseUs.map((feature, index) => (
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

        {/* FAQ Preview */}
        <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <HelpCircle className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="text-2xl md:text-4xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Quick answers to common questions</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="1">
                <AccordionTrigger>How long does company formation take?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Most formations complete in 5-10 minutes for filing. Full processing: USA (1-3 days), UK (24-48 hrs), Europe (1-4 weeks).</AccordionContent>
              </AccordionItem>
              <AccordionItem value="2">
                <AccordionTrigger>Do I need to be a resident to form a company?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">No! Non-residents can form companies in most jurisdictions. We handle all paperwork remotely.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="3">
                <AccordionTrigger>How many premium domains do you offer?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">180+ premium domains across Fintech, E-Commerce, SaaS, AI, and more. Prices from $59.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="4">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Credit/debit cards (Visa, Mastercard), bank transfers, and digital payment solutions.</AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="text-center mt-6">
              <Button variant="outline" asChild>
                <Link to="/faq">View All FAQs <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Dashboard CTA */}
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-primary/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Access your dashboard to manage companies, services, and documents all in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth">Sign Up Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
