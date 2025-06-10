
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Globe, Server, Mail, Smartphone } from 'lucide-react';

const PricingTiers = () => {
  const plans = [
    {
      name: "Starter",
      price: "$299",
      period: "one-time",
      description: "Perfect for solo entrepreneurs and small businesses",
      features: [
        "Company formation in your chosen jurisdiction",
        "EIN/Tax ID number",
        "Registered agent service (1 year)",
        "1 Domain .com registration",
        "Basic web hosting (1 year)",
        "5 Business email accounts",
        "Basic compliance monitoring",
        "Email support"
      ],
      cta: "Start Your Business",
      popular: false
    },
    {
      name: "Professional",
      price: "$599",
      period: "one-time",
      description: "Most popular choice for growing businesses",
      features: [
        "Everything in Starter",
        "1 Premium Domain .com",
        "Premium web hosting with SSL",
        "10 Business email accounts",
        "Basic website platform (Landing page)",
        "Stripe payment setup",
        "Business bank account opening",
        "Operating agreement/Articles",
        "Priority support",
        "25% discount on sister partners",
        "Basic access to digital partners"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$1,299",
      period: "one-time",
      description: "Complete solution for established businesses",
      features: [
        "Everything in Professional",
        "1 Premium Domain .com + 2 additional domains",
        "Enterprise hosting with CDN",
        "Unlimited business email accounts",
        "Full website platform (SaaS/Services/Products)",
        "Mobile application (Android/iOS/Harmony)",
        "App store publishing assistance",
        "Multiple entity formations",
        "Crypto exchange integrations",
        "Dedicated account manager",
        "50% discount on sister partners",
        "Free access to digital partners",
        "24/7 phone support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const monthlyPlans = [
    {
      name: "Maintenance",
      price: "$29",
      period: "per month",
      description: "Ongoing compliance and support",
      features: [
        "Registered agent service",
        "Compliance monitoring",
        "Annual report filing",
        "Document storage",
        "Basic support",
        "Hosting maintenance",
        "Email account management"
      ]
    },
    {
      name: "Growth",
      price: "$99",
      period: "per month",
      description: "Advanced features for scaling businesses",
      features: [
        "Everything in Maintenance",
        "Multi-entity management",
        "Advanced analytics",
        "Priority support",
        "Partner service management",
        "Website platform updates",
        "Mobile app maintenance",
        "Marketing automation tools"
      ]
    }
  ];

  const serviceIcons = {
    domain: Globe,
    hosting: Server,
    email: Mail,
    mobile: Smartphone
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Complete Business <span className="gradient-text">Service Packages</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to launch and scale your business - from formation to digital presence, 
            all with transparent pricing and no hidden fees.
          </p>
        </div>

        {/* Service Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <Card className="text-center p-4 glass-card">
            <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Domain & Hosting</p>
          </Card>
          <Card className="text-center p-4 glass-card">
            <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Business Email</p>
          </Card>
          <Card className="text-center p-4 glass-card">
            <Server className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Website Platform</p>
          </Card>
          <Card className="text-center p-4 glass-card">
            <Smartphone className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Mobile Apps</p>
          </Card>
        </div>

        {/* Formation Packages */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-8">Business Service Packages</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  plan.popular 
                    ? 'ring-2 ring-primary shadow-lg scale-105 animate-glow' 
                    : 'hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold gradient-text">{plan.price}</div>
                    <div className="text-sm text-muted-foreground">{plan.period}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full group ${plan.popular ? '' : 'variant-outline'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Monthly Plans */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8">Ongoing Services</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {monthlyPlans.map((plan, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold gradient-text">{plan.price}</div>
                    <div className="text-sm text-muted-foreground">{plan.period}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-md mx-auto glass-card animate-glow">
            <CardContent className="p-6">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold mb-2">Money-Back Guarantee</h4>
              <p className="text-sm text-muted-foreground">
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
