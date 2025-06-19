
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Smartphone, FileText, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const WithdrawForm = () => {
  const [amount, setAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const withdrawMethods = [
    { id: 'bank_transfer', name: 'Bank Transfer', icon: Building, fee: '$2.50', time: '1-3 days' },
    { id: 'paypal', name: 'PayPal', icon: Smartphone, fee: '2.9%', time: 'Instant' },
    { id: 'check', name: 'Check (Mail)', icon: FileText, fee: '$5.00', time: '5-7 days' }
  ];

  const availableBalance = 1200.00; // Mock data

  const handleWithdraw = async () => {
    if (!amount || !withdrawMethod) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      toast({
        title: "Insufficient Funds",
        description: "Withdrawal amount exceeds available balance",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - will be replaced with Supabase integration
    setTimeout(() => {
      toast({
        title: "Withdrawal Requested",
        description: `$${amount} withdrawal request has been submitted for approval.`
      });
      setAmount('');
      setWithdrawMethod('');
      setIsLoading(false);
    }, 2000);
  };

  const selectedMethod = withdrawMethods.find(method => method.id === withdrawMethod);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Withdraw Funds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Available Balance: ${availableBalance.toFixed(2)}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-300">
              Withdrawals are subject to verification and may take 1-5 business days to process.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="withdraw-amount">Amount (USD)</Label>
          <Input
            id="withdraw-amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="25"
            max={availableBalance}
          />
          <p className="text-xs text-muted-foreground">
            Minimum: $25.00 | Maximum: ${availableBalance.toFixed(2)}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Withdrawal Method</Label>
          <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Choose withdrawal method" />
            </SelectTrigger>
            <SelectContent>
              {withdrawMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <SelectItem key={method.id} value={method.id}>
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <div className="flex flex-col">
                        <span>{method.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {method.fee} • {method.time}
                        </span>
                      </div>
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
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Processing Time:</span>
              <span>{selectedMethod.time}</span>
            </div>
            <div className="flex justify-between font-medium border-t pt-2">
              <span>You'll Receive:</span>
              <span>${parseFloat(amount).toFixed(2)}</span>
            </div>
          </div>
        )}

        <Button 
          onClick={handleWithdraw} 
          className="w-full" 
          size="lg"
          disabled={isLoading || !amount || !withdrawMethod}
        >
          {isLoading ? 'Processing...' : 'Request Withdrawal'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          All withdrawals are subject to security verification and may require additional documentation.
        </p>
      </CardContent>
    </Card>
  );
};

export default WithdrawForm;
