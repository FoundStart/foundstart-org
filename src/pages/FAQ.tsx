import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const faqData = [
  {
    category: "Company Formation",
    questions: [
      { q: "How long does it take to form a company?", a: "Most company formations are completed within 5-10 minutes for initial filing. Full processing depends on the jurisdiction: USA (1-3 business days), UK (24-48 hours), Estonia (1-2 weeks), and other European countries (1-4 weeks)." },
      { q: "What types of companies can I form?", a: "We support LLC, C-Corp, S-Corp (USA), Ltd, LLP (UK), GmbH (Germany), BV (Netherlands), SL (Spain), SARL/SAS (France), and more across 9+ jurisdictions." },
      { q: "Do I need to be a resident to form a company?", a: "No! Non-residents can form companies in most of our supported jurisdictions. We handle all paperwork including registered agent services, EIN applications, and compliance requirements." },
      { q: "What documents do I need to get started?", a: "Typically you need a valid ID/passport, proof of address, and basic business information. Our AI assistant can help you prepare all required documents." },
      { q: "Can I form a company without visiting the country?", a: "Yes, 100% remote formation is available for all jurisdictions. Everything is handled digitally through our platform and partner network." },
    ]
  },
  {
    category: "Domains & Hosting",
    questions: [
      { q: "How many premium domains do you have for sale?", a: "We currently have 180+ premium domains across categories like Fintech, E-Commerce, SaaS, AI, and more. Prices start from $59 for standard domains and $2,500 for premium business domains." },
      { q: "Can I search for domains across multiple platforms?", a: "Yes! Our Domain Global Marketplace lets you search across 16+ platforms including Spaceship, GoDaddy, Hostinger, Sedo, Dynadot, and more — all from one search bar." },
      { q: "Do you offer hosting services?", a: "Yes, we offer premium cloud hosting with 99.9% uptime, free SSL certificates, automatic backups, and professional email accounts with custom domains." },
      { q: "How do I transfer a domain I purchase?", a: "We provide full support during the domain transfer process. After purchase, our team guides you through the transfer with 24/7 assistance." },
    ]
  },
  {
    category: "Partners & Services",
    questions: [
      { q: "How many digital partners do you have?", a: "We have 600+ verified digital partners across 30+ categories, including hosting, design, marketing, development, and more. Each partner is vetted for quality and reliability." },
      { q: "Do you offer affiliate programs?", a: "Yes! Join our affiliate program to earn commissions by referring clients. We offer competitive commission rates with real-time tracking through your dashboard." },
      { q: "What banking solutions do you offer?", a: "We partner with Mercury, Wise, WorldFirst, and other neo-banking solutions to provide business banking, virtual cards (Visa & Mastercard), and payment processing." },
      { q: "Can you help with SEO and digital marketing?", a: "Absolutely! We offer comprehensive SEO services including traditional SEO, local SEO, LLM optimization (LLMO), Answer Engine Optimization (AEO), and Geographic Engine Optimization (GEO)." },
    ]
  },
  {
    category: "Pricing & Payments",
    questions: [
      { q: "How much does company formation cost?", a: "Pricing varies by jurisdiction. Use our Pricing Calculator for exact costs. Basic LLC formation in the USA starts from $149, UK Ltd from £99, and European companies from €299." },
      { q: "What payment methods do you accept?", a: "We accept credit/debit cards (Visa, Mastercard), bank transfers, and digital payment solutions. Payment is processed securely through our platform." },
      { q: "Are there any hidden fees?", a: "No hidden fees. Our pricing is transparent and includes all government filing fees, registered agent services (where applicable), and basic compliance support." },
      { q: "Do you offer refunds?", a: "We offer a money-back guarantee on domain purchases and service cancellations within the specified period. Government filing fees are non-refundable once submitted." },
    ]
  },
  {
    category: "Account & Support",
    questions: [
      { q: "How do I access my dashboard?", a: "Sign in at foundstart.org/auth and you'll be redirected to your dashboard where you can manage companies, services, documents, and more." },
      { q: "Is my data secure?", a: "Yes, we implement enterprise-grade security including encrypted data storage, secure authentication with rate limiting, and SOC 2 compliant infrastructure." },
      { q: "How can I contact support?", a: "Reach us via WhatsApp, email (momo@foundstart.org), or through the AI chatbot on our website. We typically respond within 24 hours." },
      { q: "Can I manage multiple companies from one account?", a: "Yes! Your dashboard supports managing multiple companies across different jurisdictions, all from a single account." },
    ]
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 md:pb-0">
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about company formation, domains, services, and more.
              </p>
            </div>

            <div className="space-y-8">
              {faqData.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h2 className="text-xl font-semibold mb-4 text-primary">{section.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${sectionIndex}-${index}`}>
                        <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center p-8 bg-muted/30 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">Our team is here to help you 24/7</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link to="/contact-us">Contact Us</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://wa.me/21002905764" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
