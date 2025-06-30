
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PaymentModal from '@/components/payments/PaymentModal';

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
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleButtonClick = () => {
    if (plan.buttonText === "Contact Sales") {
      navigate('/contact-sales');
    } else {
      // Extract numeric price for payment
      const numericPrice = parseFloat(plan.price.replace(/[^0-9.]/g, ''));
      if (numericPrice > 0) {
        setShowPaymentModal(true);
      }
    }
  };

  const getNumericPrice = () => {
    return parseFloat(plan.price.replace(/[^0-9.]/g, ''));
  };

  const getCurrency = () => {
    if (plan.price.includes('CAD')) return 'CAD';
    if (plan.price.includes('£')) return 'GBP';
    return 'USD';
  };

  return (
    <>
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

          {plan.buttonText !== "Contact Sales" && getNumericPrice() > 0 && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Secure payment via Kashier</p>
              <div className="flex justify-center items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs text-muted-foreground">Visa, Mastercard accepted</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={getNumericPrice()}
        currency={getCurrency()}
        planId={plan.paypalPlanId}
        planName={plan.name}
      />
    </>
  );
};

export default PricingCard;
