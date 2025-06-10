
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import JurisdictionSelector from '@/components/JurisdictionSelector';
import ServiceIntegrations from '@/components/ServiceIntegrations';
import AIWizard from '@/components/AIWizard';
import PricingTiers from '@/components/PricingTiers';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <JurisdictionSelector />
      <ServiceIntegrations />
      <AIWizard />
      <PricingTiers />
      <Footer />
    </div>
  );
};

export default Index;
