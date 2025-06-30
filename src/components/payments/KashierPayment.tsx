
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Shield, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface KashierPaymentProps {
  amount: number;
  currency?: string;
  planId?: string;
  planName?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const KashierPayment = ({ 
  amount, 
  currency = 'USD', 
  planId, 
  planName,
  onSuccess,
  onError 
}: KashierPaymentProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: user?.email || '',
    phone: ''
  });

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to proceed with payment",
        variant: "destructive"
      });
      return;
    }

    if (!customerData.name || !customerData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount,
          currency,
          customer: customerData,
          planId
        }
      });

      if (error) throw error;

      if (data.success && data.paymentUrl) {
        // Redirect to Kashier payment page
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Failed to create payment order');
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error.message || 'Payment initialization failed';
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive"
      });
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Secure Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold">{currency} {amount}</div>
          {planName && <div className="text-sm text-muted-foreground">{planName}</div>}
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={customerData.name}
              onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={customerData.email}
              onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={customerData.phone}
              onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <Button 
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? 'Processing...' : `Pay ${currency} ${amount}`}
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
          <Shield className="w-4 h-4" />
          <span>Secured by Kashier</span>
          <Lock className="w-4 h-4" />
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Supports Visa, Mastercard, and other major payment methods
        </div>
      </CardContent>
    </Card>
  );
};

export default KashierPayment;
