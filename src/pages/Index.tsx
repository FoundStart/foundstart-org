
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import JurisdictionSelector from '@/components/JurisdictionSelector';
import ServiceIntegrations from '@/components/ServiceIntegrations';
import AIWizard from '@/components/AIWizard';
import AIFeatures from '@/components/AIFeatures';
import PricingTiers from '@/components/pricing/PricingTiers';
import Footer from '@/components/Footer';
import BusinessNameWidget from '@/components/BusinessNameWidget';
import ComingSoonCards from '@/components/ComingSoonCards';
import AIChatBot from '@/components/AIChatBot';
import { useTranslation } from '@/contexts/TranslationContext';

const Index = () => {
  const { t, isRTL } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main content with proper mobile spacing */}
      <main className="pb-20 md:pb-0">
        <Hero />
        
        {/* Option 1: Partner Links Section */}
        <JurisdictionSelector />
        
        {/* Option 2: FoundStart Paid Services */}  
        <PricingTiers />
        
        {/* Business Name Widget Section */}
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
        
        <ServiceIntegrations />
        <AIFeatures />
        <AIWizard />
        
        {/* Coming Soon Section */}
        <ComingSoonCards />
      </main>
      
      <Footer />
      
      {/* AI Chat Bot */}
      <AIChatBot />
    </div>
  );
};

export default Index;
