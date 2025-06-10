
import PricingCard from './PricingCard';

const PricingTiers = () => {
  const plans = [
    {
      name: "Starter",
      price: "$299",
      description: "Perfect for small businesses getting started",
      features: [
        "Company Formation (LLC/Corp)",
        "Get one Domain .com",
        "Get a Hosting (1 year)",
        "Get 10 Email businesses",
        "EIN/Tax ID Registration",
        "Basic Banking Setup",
        "50% discount on sister partners",
        "Free access to digital partners"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Professional",
      price: "$599",
      description: "Most popular for growing businesses",
      features: [
        "Everything in Starter",
        "Create a Website Platform (SAAS-Services-Products)",
        "Premium Banking Partners",
        "Payment Processing Setup",
        "Stripe Integration",
        "Crypto Exchange Integration",
        "Priority Support",
        "Compliance Monitoring"
      ],
      isPopular: true,
      buttonText: "Start Professional"
    },
    {
      name: "Enterprise",
      price: "$999",
      description: "Complete solution for established businesses",
      features: [
        "Everything in Professional",
        "Mobile Application (Android-IOS-Harmony) with publishing",
        "White-label Solutions",
        "Custom Integrations",
        "Dedicated Account Manager",
        "Advanced Analytics",
        "24/7 Premium Support",
        "Custom Compliance Solutions"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. All plans include our core services with different levels of support and features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            All plans include 30-day money-back guarantee
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
            <span>✓ Money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
