import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/TranslationContext';
import { faqCategories } from '@/data/faqData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const wanted = ['How long does it take to form a company?', 'Can a non-resident or foreigner own a company abroad?', 'How much does company formation cost?', 'How do I pay?', 'Does FoundStart open a bank account for me?', 'Which countries can I open a company in with FoundStart?'];
const picks = faqCategories.flatMap(c => c.items).filter(i => wanted.includes(i.q)).sort((x, y) => wanted.indexOf(x.q) - wanted.indexOf(y.q));

const HomeFAQ = () => {
  const { language } = useTranslation();
  const ar = language === 'ar';
  return (
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
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2">{ar ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</h2>
        <p className="text-muted-foreground">{ar ? 'إجابات سريعة عن الأسئلة الشائعة' : 'Quick answers to common questions'}</p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Accordion type="single" collapsible className="w-full">
          {picks.map((i, n) => (
            <AccordionItem key={n} value={String(n)}>
              <AccordionTrigger className="text-start">{ar ? i.qAr : i.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{ar ? i.aAr : i.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-6">
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/faq">{ar ? 'كل الأسئلة' : 'View All FAQs'} <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button asChild>
              <Link to="/countries">{ar ? 'الدول والأسعار' : 'Countries & Prices'} <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default HomeFAQ;
