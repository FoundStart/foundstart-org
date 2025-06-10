
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import JurisdictionSelector from '@/components/JurisdictionSelector';
import ServiceIntegrations from '@/components/ServiceIntegrations';
import AIWizard from '@/components/AIWizard';
import PricingTiers from '@/components/pricing/PricingTiers';
import Footer from '@/components/Footer';
import BusinessNameWidget from '@/components/BusinessNameWidget';
import Dashboard from '@/components/Dashboard';
import ComingSoonCards from '@/components/ComingSoonCards';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <JurisdictionSelector />
      
      {/* Business Name Widget Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Find the Perfect <span className="gradient-text">Business Name</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate unique, brandable names for your business with AI-powered suggestions 
              and instant availability checking.
            </p>
          </div>
          <BusinessNameWidget />
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard">
        <Dashboard />
      </section>
      
      <ServiceIntegrations />
      <AIWizard />
      
      {/* Coming Soon Section */}
      <ComingSoonCards />
      
      <PricingTiers />
      <Footer />
    </div>
  );
};

export default Index;
