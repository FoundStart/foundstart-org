import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, DollarSign, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const pricingPlans = [
  {
    name: 'Company Formation',
    description: 'Register your business in multiple jurisdictions',
    price: 499,
    features: [
      'Complete registration process',
      'EIN/Tax ID assistance',
      'Registered agent service (1 year)',
      'Operating agreement templates',
      'Business bank account support'
    ],
    popular: false
  },
  {
    name: 'Digital Business Suite',
    description: 'Everything you need to run your business online',
    price: 999,
    features: [
      'Company formation included',
      'Custom domain (1 year)',
      'Business email hosting',
      'Website builder platform',
      'SEO optimization tools',
      'Analytics dashboard'
    ],
    popular: true
  },
  {
    name: 'Complete Business Package',
    description: 'Full-service solution for growing businesses',
    price: 1999,
    features: [
      'All Digital Suite features',
      'Mobile application development',
      'Business banking account',
      'Virtual cards (up to 5)',
      'International eSIM service',
      'Priority support 24/7',
      'Quarterly business consulting'
    ],
    popular: false
  }
];

const PricingSection = () => {
  const handlePurchase = (planName: string, price: number) => {
    toast.success(`Redirecting to purchase ${planName}...`);
    // Integration with payment system will go here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Pricing & Plans</h1>
            <p className="text-muted-foreground">Choose the perfect plan for your business needs</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.name} 
            className={plan.popular ? 'border-primary shadow-lg' : ''}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle>{plan.name}</CardTitle>
                {plan.popular && (
                  <Badge className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Popular
                  </Badge>
                )}
              </div>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground ml-2">one-time</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant={plan.popular ? 'default' : 'outline'}
                size="lg"
                onClick={() => handlePurchase(plan.name, plan.price)}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Need a Custom Solution?</CardTitle>
          <CardDescription>
            Contact our sales team for enterprise pricing and custom packages tailored to your specific needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingSection;
