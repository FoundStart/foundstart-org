import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import BusinessNameWidget from '@/components/BusinessNameWidget';
import HomeFAQ from '@/components/home/HomeFAQ';
import HomeServices from '@/components/home/HomeServices';
import HomeCTA from '@/components/home/HomeCTA';
import HomeWhyChoose from '@/components/home/HomeWhyChoose';

const Index = () => {
  const { t, isRTL, language } = useTranslation();

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      <Header />
      
      <main className="pb-20 md:pb-0 w-full max-w-full">
        <Hero />
        <HomeServices language={language} isRTL={isRTL} />

        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
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

        <HomeCTA />
        <HomeWhyChoose />
        <HomeFAQ />

        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-purple-500/10" />
          <div className="container mx-auto max-w-4xl text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
