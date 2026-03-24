import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Globe, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const HomeCTA = () => (
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
);

export default HomeCTA;
