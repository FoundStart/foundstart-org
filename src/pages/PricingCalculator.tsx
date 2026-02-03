import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingCalculatorComponent from '@/components/pricing/PricingCalculator';
import { Calculator, Globe, Building2, CreditCard } from 'lucide-react';

const PricingCalculatorPage: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Pricing Calculator - FoundStart | Company Formation Cost Estimator</title>
        <meta 
          name="description" 
          content="Calculate your company formation costs instantly. Select your country, entity type, and add-on services to get a transparent price estimate for your business setup." 
        />
        <meta name="keywords" content="company formation cost, LLC pricing, business setup calculator, formation fees, startup costs" />
        <link rel="canonical" href="https://foundstart.org/pricing-calculator" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-6">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Company Formation <span className="text-primary">Pricing Calculator</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Get an instant estimate for your company formation. Select your country, 
              entity type, and add-on services to see your total cost.
            </p>
          </div>

          {/* How It Works */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">1. Choose Country</h3>
              <p className="text-sm text-muted-foreground">Select from 9+ jurisdictions worldwide</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">2. Select Entity Type</h3>
              <p className="text-sm text-muted-foreground">Pick the right structure for your business</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">3. Add Services</h3>
              <p className="text-sm text-muted-foreground">Customize with optional add-ons</p>
            </div>
          </div>

          {/* Calculator */}
          <PricingCalculatorComponent />
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default PricingCalculatorPage;
