import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const HomeWhyChoose = () => (
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
);

export default HomeWhyChoose;
