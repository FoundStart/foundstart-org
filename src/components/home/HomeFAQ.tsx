import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const HomeFAQ = () => (
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
          <AccordionItem value="5">
            <AccordionTrigger>Can I get a business bank account after formation?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">Yes! We partner with Mercury, Wise, and WorldFirst to help you open a business bank account immediately after formation.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="6">
            <AccordionTrigger>What countries can I form a company in?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">USA, UK, Canada, Estonia, Finland, Sweden, Latvia, Lithuania, Ireland, and Egypt. Each with specialized formation partners.</AccordionContent>
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
);

export default HomeFAQ;
