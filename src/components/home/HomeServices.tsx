import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Building2, Globe, Shield, CreditCard, Mail, Server, 
  Smartphone, Wifi, Gift, Search, Brain, Target, TrendingUp, FileText, Users2, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
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

interface HomeServicesProps {
  language: string;
  isRTL: boolean;
}

const HomeServices = ({ language, isRTL }: HomeServicesProps) => (
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
);

export default HomeServices;
