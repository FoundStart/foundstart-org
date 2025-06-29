import PricingCard from './PricingCard';

const PricingTiers = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "$499",
      description: "Perfect for new entrepreneurs",
      features: [
        "LLC Formation via preferred partner",
        "EIN (Tax ID) Registration",
        "Operating Agreement Template",
        "Registered Agent Service (1 year)",
        "Basic Business Address",
        "ITIN consultation",
        "AI Business Setup Consultation",
        "Mercury Bank Account Setup Assistance",
        "Stripe Payment Gateway Integration"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      paypalPlanId: "starter-plan"
    },
    {
      name: "Professional",
      price: "$899",
      description: "Most popular for serious businesses",
      features: [
        "Everything in Starter Package",
        "Full ITIN Application Service",
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
      buttonText: "Most Popular",
      paypalPlanId: "professional-plan"
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
      buttonText: "Contact Sales",
      paypalPlanId: "enterprise-plan"
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
      buttonText: "Start in Canada",
      paypalPlanId: "canada-starter"
    },
    {
      name: "Canada Professional",
      price: "$799 CAD",
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
      buttonText: "Go Professional",
      paypalPlanId: "canada-professional"
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
        "Ongoing Business Advisory (3 months)",
        "International Trade Setup"
      ],
      buttonText: "Enterprise Setup",
      paypalPlanId: "canada-enterprise"
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
      buttonText: "Start in UK",
      paypalPlanId: "uk-starter"
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
      buttonText: "Go Professional",
      paypalPlanId: "uk-professional"
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
      buttonText: "Enterprise Setup",
      paypalPlanId: "uk-enterprise"
    }
  ];

  return (
    <section id="foundstart-pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Option 2:</span> FoundStart AI-Powered Formation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get comprehensive business formation with AI guidance, compliance monitoring, 
            and ongoing support. Pay securely with PayPal.
          </p>
        </div>

        {/* United States Pricing */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-8">🇺🇸 United States (USA)</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>

        {/* Canada Pricing */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-8">🇨🇦 Canada</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {canadaPricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>

        {/* United Kingdom Pricing */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-8">🇬🇧 United Kingdom</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {ukPricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>

        {/* AI Agent Features */}
        <div className="bg-card rounded-xl p-8 mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">
            🤖 AI Agent Features <span className="text-sm font-normal text-muted-foreground">(Included in All Packages)</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 gradient-text">Core AI Services:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Business Name Generator & Availability Check</li>
                <li>• Industry-Specific Compliance Requirements</li>
                <li>• Tax Structure Optimization Recommendations</li>
                <li>• Banking & Financial Setup Guidance</li>
                <li>• License & Permit Identification</li>
                <li>• Legal Structure Advisory</li>
                <li>• Ongoing Compliance Reminders</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 gradient-text">Advanced AI Features (Professional & Enterprise):</h4>
              <ul className="space-y-2 text-sm">
                <li>• Predictive Compliance Monitoring</li>
                <li>• Automated Document Generation</li>
                <li>• Real-time Regulatory Updates</li>
                <li>• Custom Business Plan Generation</li>
                <li>• Market Analysis & Insights</li>
                <li>• Growth Strategy Recommendations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include AI-powered business consultation and expert support
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-6">
            <span>✓ AI Business Guidance</span>
            <span>✓ Expert Support</span>
            <span>✓ Banking Assistance</span>
            <span>✓ Payment Processing</span>
            <span>✓ Compliance Monitoring</span>
            <span>✓ Document Templates</span>
          </div>
          <p className="text-xs text-muted-foreground">
            *Prices exclude government filing fees and may vary based on specific requirements.<br/>
            All packages include comprehensive AI-powered guidance and 24/7 customer support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
