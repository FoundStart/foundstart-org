
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Shield, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface StripePaymentProps {
  amount: number;
  currency?: string;
  planId?: string;
  planName?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const StripePayment = ({ 
  amount, 
  currency = 'USD', 
  planId, 
  planName,
  onSuccess,
  onError 
}: StripePaymentProps) => {
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
      const { data, error } = await supabase.functions.invoke('stripe-create-payment', {
        body: {
          amount,
          currency,
          customer: customerData,
          planId
        }
      });

      if (error) {
        console.error('Payment function error');
        throw new Error('Payment initialization failed');
      }

      if (data?.success && data?.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error(data?.error || 'Failed to create payment order');
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

  return <Card><CardContent className="p-6">Online payments are paused. EasyKash is not active yet. / الدفع الإلكتروني متوقف لحين تفعيل EasyKash.</CardContent></Card>;
};
export default StripePayment;
