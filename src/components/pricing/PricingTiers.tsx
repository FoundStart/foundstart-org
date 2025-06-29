
import PricingCard from './PricingCard';

const PricingTiers = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "$499",
      description: "Perfect for new entrepreneurs",
      features: [
        "LLC Formation via preferred partner (TheITIN, Clemta, or StartGlobal)",
        "EIN (Tax ID) Registration",
        "Operating Agreement Template",
        "Registered Agent Service (1 year)",
        "Basic Business Address",
        "ITIN consultation (TheITIN partnership)",
        "AI Business Setup Consultation",
        "Mercury Bank Account Setup Assistance",
        "Stripe Payment Gateway Integration"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Professional",
      price: "$899",
      description: "Most popular for serious businesses",
      features: [
        "Everything in Starter Package",
        "Full ITIN Application Service (via TheITIN - $395 value)",
        "Expedited Processing (3-5 business days)",
        "Premium Business Address & Mail Forwarding",
        "Business Banking with Mercury (Premium features)",
        "Advanced Stripe Integration (No fees on first $20K)",
        "Compliance Monitoring (1 year)",
        "Business License Research",
        "BOI Filing included",
        "AI-Powered Tax Optimization Consultation"
      ],
      isPopular: true,
      buttonText: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "$1,599",
      description: "Complete solution for established businesses",
      features: [
        "Everything in Professional Package",
        "Clemta Premium or StartGlobal Enterprise level service",
        "Multi-state Registration Options",
        "Multiple ITIN applications (family/partners)",
        "Full Compliance Management with CPA consultation",
        "Priority AI Agent Support",
        "Advanced Financial Setup & Monthly Bookkeeping",
        "Custom Legal Document Preparation",
        "Ongoing Business Advisory (6 months)",
        "Trademark consultation included"
      ],
      buttonText: "Contact Sales"
    }
  ];

  const canadaPricingPlans = [
    {
      name: "Canada Starter",
      price: "$499 CAD",
      description: "Federal or Provincial Corporation setup",
      features: [
        "Federal or Provincial Corporation Registration",
        "Business Number (BN) Registration",
        "Corporate Bylaws & Resolutions",
        "Registered Office Service (1 year)",
        "AI Business Setup Consultation",
        "Canadian Banking Setup Assistance",
        "Payment Processing Integration"
      ],
      buttonText: "Start in Canada"
    },
    {
      name: "Canada Professional",
      price: "$749 CAD",
      description: "Advanced Canadian business setup",
      features: [
        "Everything in Canada Starter Package",
        "Expedited Processing",
        "Premium Registered Office Address",
        "GST/HST Registration",
        "Provincial Tax Account Setup",
        "Compliance Calendar & Reminders",
        "Business License Research",
        "AI-Powered Tax Planning"
      ],
      buttonText: "Go Professional"
    },
    {
      name: "Canada Enterprise",
      price: "$1,399 CAD",
      description: "Complete Canadian business solution",
      features: [
        "Everything in Canada Professional Package",
        "Multi-provincial Registration",
        "Full Corporate Maintenance",
        "Advanced Banking Solutions",
        "Priority AI Support",
        "Legal Document Templates",
        "Ongoing Business Advisory"
      ],
      buttonText: "Enterprise Setup"
    }
  ];

  const ukPricingPlans = [
    {
      name: "UK Starter",
      price: "£399",
      description: "Private Limited Company formation",
      features: [
        "Private Limited Company Formation",
        "Companies House Registration",
        "Memorandum & Articles of Association",
        "Registered Office Service (1 year)",
        "AI Business Setup Consultation",
        "UK Banking Setup Assistance",
        "Payment Processing Integration"
      ],
      buttonText: "Start in UK"
    },
    {
      name: "UK Professional",
      price: "£599",
      description: "Advanced UK business setup",
      features: [
        "Everything in UK Starter Package",
        "Same-day Company Formation",
        "Premium London Business Address",
        "VAT Registration (if required)",
        "PAYE Setup for Employers",
        "Compliance Monitoring",
        "Business License Research",
        "AI-Powered Tax Optimization"
      ],
      buttonText: "Go Professional"
    },
    {
      name: "UK Enterprise",
      price: "£1,199",
      description: "Complete UK business solution",
      features: [
        "Everything in UK Professional Package",
        "Multiple Company Formations",
        "Full Secretarial Services",
        "Advanced Banking Solutions",
        "Priority AI Agent Support",
        "Legal Document Suite",
        "Ongoing Business Advisory (3 months)",
        "International Business Setup"
      ],
      buttonText: "Enterprise Setup"
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            AI-Powered Business Formation <span className="gradient-text">Platform</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Launch your business with AI guidance and expert support. 
            Choose your jurisdiction and get started with FoundStart.
          </p>
        </div>

        {/* United States Pricing */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-8">United States (USA) 🇺🇸</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>

        {/* Canada Pricing */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-8">Canada 🇨🇦</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {canadaPricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>

        {/* United Kingdom Pricing */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-8">United Kingdom 🇬🇧</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {ukPricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include AI-powered business consultation and expert support
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>✓ AI Business Guidance</span>
            <span>✓ Expert Support</span>
            <span>✓ Banking Assistance</span>
            <span>✓ Payment Processing</span>
            <span>✓ Compliance Monitoring</span>
            <span>✓ Document Templates</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
