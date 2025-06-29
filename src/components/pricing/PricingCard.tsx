
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
    buttonVariant?: "default" | "outline";
    paypalPlanId?: string;
  };
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const handlePayPalPayment = (planId: string) => {
    // In a real implementation, you would integrate with PayPal SDK
    // For now, we'll show an alert and open PayPal in a new tab
    console.log(`Initiating PayPal payment for plan: ${planId}`);
    
    // Example PayPal integration - replace with actual PayPal SDK
    const paypalUrl = `https://www.paypal.com/checkout?plan=${planId}`;
    window.open(paypalUrl, '_blank');
  };

  const handleButtonClick = () => {
    if (plan.paypalPlanId) {
      handlePayPalPayment(plan.paypalPlanId);
    } else {
      // Handle other actions like "Contact Sales"
      console.log(`Action: ${plan.buttonText}`);
    }
  };

  return (
    <Card className={`relative transition-all duration-300 hover:shadow-xl ${plan.isPopular ? 'border-primary shadow-xl scale-105' : ''}`}>
      {plan.isPopular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <div className="space-y-2">
          <div className="text-4xl font-bold gradient-text">{plan.price}</div>
          <p className="text-muted-foreground">{plan.description}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button 
          className="w-full" 
          variant={plan.buttonVariant || "default"}
          size="lg"
          onClick={handleButtonClick}
        >
          {plan.buttonText}
        </Button>

        {plan.paypalPlanId && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">Secure payment via PayPal</p>
            <div className="flex justify-center">
              <img 
                src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" 
                alt="PayPal" 
                className="h-6"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingCard;
