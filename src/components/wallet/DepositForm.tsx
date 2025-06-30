
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Building, Smartphone, Bitcoin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const DepositForm = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const paymentMethods = [
    { id: 'kashier', name: 'Credit/Debit Card (Kashier)', icon: CreditCard, fee: '2.9%' },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: Building, fee: '$0.50' },
    { id: 'paypal', name: 'PayPal', icon: Smartphone, fee: '3.4%' },
    { id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin, fee: '1.5%' }
  ];

  const handleDeposit = async () => {
    if (!amount || !paymentMethod) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to deposit funds",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      if (paymentMethod === 'kashier') {
        // Use Kashier for credit card payments
        const { data, error } = await supabase.functions.invoke('create-payment', {
          body: {
            amount: parseFloat(amount),
            currency: 'USD',
            customer: {
              name: user.email,
              email: user.email,
              phone: ''
            },
            planId: 'wallet-deposit'
          }
        });

        if (error) throw error;

        if (data.success && data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          throw new Error('Failed to create payment order');
        }
      } else {
        // Simulate other payment methods
        setTimeout(() => {
          toast({
            title: "Deposit Initiated",
            description: `$${amount} deposit request has been submitted for processing.`
          });
          setAmount('');
          setPaymentMethod('');
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Deposit error:', error);
      toast({
        title: "Deposit Error",
        description: error.message || "Failed to process deposit",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const selectedMethod = paymentMethods.find(method => method.id === paymentMethod);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Deposit Funds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (USD)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="10"
            max="10000"
          />
          <p className="text-xs text-muted-foreground">
            Minimum: $10.00 | Maximum: $10,000.00
          </p>
        </div>

        <div className="space-y-2">
          <Label>Payment Method</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Choose payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <SelectItem key={method.id} value={method.id}>
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{method.name}</span>
                      <span className="text-muted-foreground text-xs">({method.fee})</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {selectedMethod && amount && (
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Amount:</span>
              <span>${parseFloat(amount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Fee:</span>
              <span>{selectedMethod.fee}</span>
            </div>
            <div className="flex justify-between font-medium border-t pt-2">
              <span>Total:</span>
              <span>${parseFloat(amount).toFixed(2)}</span>
            </div>
          </div>
        )}

        <Button 
          onClick={handleDeposit} 
          className="w-full" 
          size="lg"
          disabled={isLoading || !amount || !paymentMethod}
        >
          {isLoading ? 'Processing...' : 'Deposit Funds'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your funds will be available within 1-3 business days depending on the payment method.
        </p>
      </CardContent>
    </Card>
  );
};

export default DepositForm;
