
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Building, Smartphone, Bitcoin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DepositForm = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const paymentMethods = [
    { id: 'credit_card', name: 'Credit/Debit Card', icon: CreditCard, fee: '2.9%' },
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

    setIsLoading(true);
    
    // Simulate API call - will be replaced with Supabase integration
    setTimeout(() => {
      toast({
        title: "Deposit Initiated",
        description: `$${amount} deposit request has been submitted for processing.`
      });
      setAmount('');
      setPaymentMethod('');
      setIsLoading(false);
    }, 2000);
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
