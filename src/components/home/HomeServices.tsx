import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Shield, Brain, FileText, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiAgents } from '@/data/agentsData';
import AgentAvatar from '@/components/AgentAvatar';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const agentCategory = {
  title: "AI Agents",
  titleAr: "وكلاء الذكاء الاصطناعي",
  services: aiAgents.map((a) => ({
    icon: Brain,
    title: `${a.name.en} Agent`,
    titleAr: `وكيل ${a.name.ar}`,
    desc: a.tagline.en,
    descAr: a.tagline.ar,
    link: `/agents/${a.slug}`,
    gradient: "from-blue-500 to-indigo-600",
  })),
};

const serviceCategories = [
  {
    title: "Formation & Legal",
    services: [
      { icon: Building2, title: "Company Formation", desc: "LLC, Corp, Ltd in 9 jurisdictions", link: "/agents/company-formation", gradient: "from-blue-500 to-indigo-600" },
      { icon: FileText, title: "AI Documents", desc: "Business plans, contracts & legal docs", link: "/agents/ai-documents", gradient: "from-violet-500 to-purple-600" },
      { icon: Shield, title: "Compliance", desc: "EIN, registered agent, annual filings", link: "/agents/compliance", gradient: "from-emerald-500 to-teal-600" },
    ]
  },
  agentCategory,
];

interface HomeServicesProps {
  language: string;
  isRTL: boolean;
}

const HomeServices = ({ language, isRTL }: HomeServicesProps) => (
  <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto max-w-7xl">
      <motion.div
        className="text-center mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          <Zap className="w-4 h-4 mr-2" />
          {language === 'ar' ? '28 وكيل ذكاء اصطناعي' : '28 AI Agents'}
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

      <div className="space-y-10">
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
              {language === 'ar' && (category as { titleAr?: string }).titleAr ? (category as { titleAr?: string }).titleAr : category.title}
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
                const agentSlug = service.link.startsWith('/agents/') ? service.link.slice('/agents/'.length) : null;
                const agentCfg = agentSlug ? aiAgents.find((a) => a.slug === agentSlug) : undefined;
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
                          {agentCfg ? (
                            <AgentAvatar slug={agentCfg.slug} icon={agentCfg.icon} className="w-11 h-11 mb-4 group-hover:scale-110 transition-transform duration-300" iconClassName="w-5 h-5" />
                          ) : (
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <h4 className="font-bold text-sm mb-1.5 group-hover:text-primary transition-colors">{language === 'ar' && (service as { titleAr?: string }).titleAr ? (service as { titleAr?: string }).titleAr : service.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{language === 'ar' && (service as { descAr?: string }).descAr ? (service as { descAr?: string }).descAr : service.desc}</p>
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
