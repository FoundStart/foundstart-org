
import JurisdictionOverview from './jurisdiction/JurisdictionOverview';
import PartnerCategory from './jurisdiction/PartnerCategory';
import JurisdictionCTA from './jurisdiction/JurisdictionCTA';
import { Globe, CreditCard, Phone } from 'lucide-react';
import { jurisdictionInfo, partnerData } from '@/data/jurisdictionData';

const JurisdictionSelector = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Company Formation':
        return Globe;
      case 'Finance':
        return CreditCard;
      case 'Telecommunications':
        return Phone;
      default:
        return Globe;
    }
  };

  const categories = ['Company Formation', 'Finance', 'Telecommunications'];

  return (
    <section id="partner-links" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Option 1:</span> Quick Setup with Trusted Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started immediately with our 400+ vetted formation partners. 
            Click any platform to begin your business setup process instantly.
          </p>
        </div>

        <JurisdictionOverview jurisdictions={jurisdictionInfo} />

        {categories.map((category) => (
          <PartnerCategory
            key={category}
            category={category}
            partners={partnerData.filter(p => p.category === category)}
            icon={getCategoryIcon(category)}
          />
        ))}

        <JurisdictionCTA />
      </div>
    </section>
  );
};

export default JurisdictionSelector;
