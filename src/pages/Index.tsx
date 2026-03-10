import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  ArrowRight, Building2, Globe, Shield, CheckCircle, Star, Users, CreditCard, Mail, Server, 
  Smartphone, Wifi, Gift, Search, Brain, Target, TrendingUp, Briefcase, FileText, Users2, 
  HelpCircle, Zap, Sparkles, Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import BusinessNameWidget from '@/components/BusinessNameWidget';
import EntitySelector from '@/components/EntitySelector';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const serviceCategories = [
  {
    title: "Formation & Legal",
    services: [
      { icon: Building2, title: "Company Formation", desc: "LLC, Corp, Ltd in 9 jurisdictions", link: "/countries", gradient: "from-blue-500 to-indigo-600" },
      { icon: FileText, title: "AI Documents", desc: "Business plans, contracts & legal docs", link: "/dashboard/ai-assistant", gradient: "from-violet-500 to-purple-600" },
      { icon: Shield, title: "Compliance", desc: "EIN, registered agent, annual filings", link: "/services", gradient: "from-emerald-500 to-teal-600" },
    ]
  },
  {
    title: "Digital Presence",
    services: [
      { icon: Globe, title: "Premium Domains", desc: "170+ domains from $59", link: "/domains", gradient: "from-cyan-500 to-blue-600" },
      { icon: Server, title: "Web Hosting", desc: "99.9% uptime cloud hosting", link: "/services", gradient: "from-purple-500 to-pink-600" },
      { icon: Mail, title: "Business Email", desc: "Professional email accounts", link: "/services", gradient: "from-orange-500 to-red-500" },
      { icon: TrendingUp, title: "Website Platform", desc: "SaaS-ready & e-commerce", link: "/services", gradient: "from-pink-500 to-rose-600" },
      { icon: Smartphone, title: "Mobile Apps", desc: "Android, iOS & Harmony", link: "/services", gradient: "from-indigo-500 to-blue-600" },
    ]
  },
  {
    title: "Growth & Marketing",
    services: [
      { icon: Search, title: "SEO & SEM", desc: "Search engine optimization & marketing", link: "/seo-management", gradient: "from-green-500 to-emerald-600" },
      { icon: Brain, title: "AI & LLMO", desc: "LLM optimization for AI visibility", link: "/seo-management", gradient: "from-fuchsia-500 to-purple-600" },
      { icon: Target, title: "GEO & AEO", desc: "Geographic & Answer Engine optimization", link: "/seo-management", gradient: "from-amber-500 to-orange-600" },
    ]
  },
  {
    title: "Fintech & Payments",
    services: [
      { icon: CreditCard, title: "Business Banking", desc: "Mercury, Wise, WorldFirst & Neo", link: "/services", gradient: "from-sky-500 to-cyan-600" },
      { icon: CreditCard, title: "Virtual Cards", desc: "Visa & Mastercard virtual cards", link: "/services", gradient: "from-teal-500 to-green-600" },
      { icon: Wifi, title: "eSIM Cards", desc: "Global connectivity for nomads", link: "/digital-nomad-visas", gradient: "from-lime-500 to-green-600" },
      { icon: Gift, title: "Gift Cards", desc: "Digital gift card platform", link: "/services", gradient: "from-red-500 to-pink-600" },
      { icon: Users2, title: "Remote Hiring", desc: "VAs, support & data entry", link: "/freelancer-partners", gradient: "from-blue-500 to-violet-600" },
    ]
  },
];

const stats = [
  { value: "9+", label: "Jurisdictions", icon: Globe },
  { value: "170+", label: "Premium Domains", icon: Sparkles },
  { value: "15+", label: "Business Services", icon: Zap },
  { value: "5-10min", label: "Setup Time", icon: Rocket },
];

const Index = () => {
  const { t, isRTL, language } = useTranslation();

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      <Header />
      
      <main className="pb-20 md:pb-0 w-full max-w-full">
        <Hero />
        <EntitySelector />

        {/* Animated Stats Strip */}
        <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
          <div className="container mx-auto max-w-6xl relative">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {stats.map((stat, i) => (
                <motion.div key={i} variants={scaleIn} transition={{ duration: 0.5, type: 'spring' }}>
                  <div className="text-center group cursor-default">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-3 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-extrabold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Showcase */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Zap className="w-4 h-4 mr-2" />
                {language === 'ar' ? '15+ خدمة متكاملة' : '15+ Integrated Services'}
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                {language === 'ar' ? 'كل ما تحتاجه' : 'Everything You Need to'}{' '}
                <span className="gradient-text">{language === 'ar' ? 'لنجاح أعمالك' : 'Build & Scale'}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'من تأسيس الشركات إلى التسويق الرقمي - منصة واحدة شاملة'
                  : 'From company formation to digital marketing — one platform, zero friction'}
              </p>
            </motion.div>

            <div className="space-y-16">
              {serviceCategories.map((category, catIdx) => (
                <div key={catIdx}>
                  <motion.h3
                    className="text-lg font-bold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="h-px flex-1 bg-border" />
                    {category.title}
                    <span className="h-px flex-1 bg-border" />
                  </motion.h3>
                  <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {category.services.map((service, idx) => {
                      const Icon = service.icon;
                      return (
                        <motion.div
                          key={idx}
                          variants={fadeUp}
                          transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
                        >
                          <Link to={service.link} className="group block h-full">
                            <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative">
                              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                              <CardContent className="p-5 relative">
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="font-bold text-sm mb-1.5 group-hover:text-primary transition-colors">{service.title}</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
                                <ArrowRight className="w-4 h-4 text-primary mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              className="text-center mt-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <Button size="lg" className="text-base px-10 py-6 shadow-lg hover:shadow-xl transition-shadow" asChild>
                <Link to="/services">
                  {language === 'ar' ? 'استكشف جميع الخدمات' : 'Explore All Services'}
                  <ArrowRight className={`w-5 h-5 ml-2 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Business Name Generator */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <div className={`space-y-4 mb-10 ${isRTL ? 'text-right' : 'text-center'}`}>
                <h2 className="text-2xl md:text-4xl font-extrabold">
                  {t.findPerfectName} <span className="gradient-text">{t.businessName}</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.businessNameDescription}</p>
              </div>
              <BusinessNameWidget />
            </motion.div>
          </div>
        </section>

        {/* CTA Cards */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                { icon: Building2, title: "Start Your Company", desc: "Form LLC or Corp in USA, UK, or Europe in minutes", link: "/countries", cta: "Get Started", variant: "default" as const, gradient: "from-blue-500 to-indigo-600" },
                { icon: Globe, title: "Find Your Domain", desc: "Browse 170+ premium domains or search 16+ platforms", link: "/domains", cta: "Browse Domains", variant: "outline" as const, gradient: "from-cyan-500 to-blue-600" },
                { icon: Briefcase, title: "Calculate Pricing", desc: "Get exact pricing for your company formation needs", link: "/pricing-calculator", cta: "Calculate Now", variant: "outline" as const, gradient: "from-emerald-500 to-teal-600" },
              ].map((card, i) => (
                <motion.div key={i} variants={scaleIn} transition={{ duration: 0.5, type: 'spring', bounce: 0.25 }}>
                  <Card className="group text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-md overflow-hidden relative h-full">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />
                    <CardContent className="pt-10 pb-8 px-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <card.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-extrabold text-xl mb-2">{card.title}</h3>
                      <p className="text-muted-foreground mb-6 text-sm">{card.desc}</p>
                      <Button asChild variant={card.variant} className="w-full">
                        <Link to={card.link}>{card.cta}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose FoundStart */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                Why Choose <span className="gradient-text">FoundStart?</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted by entrepreneurs worldwide for seamless business solutions
              </p>
            </motion.div>
            
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                { icon: Star, title: "All-in-One Platform", desc: "Everything from formation to marketing in one place", gradient: "from-amber-500 to-orange-600" },
                { icon: Users, title: "Expert Support", desc: "24/7 assistance throughout your business journey", gradient: "from-blue-500 to-indigo-600" },
                { icon: CheckCircle, title: "100% Compliant", desc: "All filings and registrations handled correctly", gradient: "from-emerald-500 to-green-600" },
              ].map((feature, i) => (
                <motion.div key={i} variants={scaleIn} transition={{ duration: 0.5, type: 'spring' }}>
                  <Card className="text-center border-0 shadow-md hover:shadow-xl transition-all duration-300 group h-full">
                    <CardContent className="pt-8 pb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <HelpCircle className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Quick answers to common questions</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
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
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-purple-500/10" />
          <div className="container mx-auto max-w-4xl text-center relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Access your dashboard to manage companies, services, and documents all in one place.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="text-base px-8 py-6 shadow-lg" asChild>
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 py-6" asChild>
                  <Link to="/auth">Sign Up Free</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
