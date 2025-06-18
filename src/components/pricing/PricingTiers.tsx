
import PricingCard from './PricingCard';

const PricingTiers = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "$99",
      description: "Perfect for solo entrepreneurs",
      features: [
        "Company Formation (LLC/Corp)",
        "1 Domain .com registration",
        "Basic web hosting (1GB)",
        "5 Business email accounts",
        "Basic website platform",
        "Mobile app template",
        "Basic SEO optimization",
        "25% discount on sister partners",
        "Access to digital partners directory"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Professional",
      price: "$299",
      description: "Ideal for growing businesses",
      features: [
        "Company Formation + EIN",
        "1 Domain .com + SSL certificate",
        "Premium hosting (10GB)",
        "10 Business email accounts",
        "Professional website platform (SAAS ready)",
        "Mobile Application (Android + iOS)",
        "Virtual Cards (5 cards)",
        "eSIM Global (5GB data)",
        "SEO + ASO optimization",
        "GEO targeting setup",
        "50% discount on sister partners",
        "Free access to digital partners",
        "Priority support"
      ],
      isPopular: true,
      buttonText: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "$599",
      description: "For established businesses",
      features: [
        "Complete business formation package",
        "3 Domain registrations",
        "Enterprise hosting (100GB)",
        "Unlimited business emails",
        "Full website platform (SAAS-Services-Products)",
        "Mobile Application (Android-iOS-Harmony) with publishing",
        "Unlimited Virtual Cards",
        "eSIM Global (50GB data)",
        "Gift Cards issuing platform",
        "Complete SEO + ASO + LLMO + GEO + AEO + SEM",
        "AI-powered optimization",
        "75% discount on sister partners",
        "Premium access to all digital partners",
        "Dedicated account manager",
        "24/7 priority support"
      ],
      buttonText: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. All plans include 
            our core formation services plus modern digital solutions and optimization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include company formation, banking setup, and access to our partner ecosystem
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>✓ Virtual Cards</span>
            <span>✓ eSIM Services</span>
            <span>✓ Gift Cards</span>
            <span>✓ SEO/ASO/LLMO Optimization</span>
            <span>✓ 230+ Digital Partners</span>
            <span>✓ Mobile Apps</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
