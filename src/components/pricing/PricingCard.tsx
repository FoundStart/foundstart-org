
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
  };
}

const PricingCard = ({ plan }: PricingCardProps) => {
  return (
    <Card className={`relative ${plan.isPopular ? 'border-primary shadow-xl scale-105' : ''}`}>
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
        >
          {plan.buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
