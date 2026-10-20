
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useWalletData } from './useWalletData';

const WalletBalance = () => {
  const [showBalance, setShowBalance] = useState(true);
  
  const { balance, pending: pendingAmount } = useWalletData();
  const availableBalance = balance;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Wallet Balance
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">
                ${showBalance ? balance.toFixed(2) : '***.**'}
              </span>
            </div>
            <p className="text-muted-foreground">Total Balance</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-lg font-semibold text-green-600">
                ${showBalance ? availableBalance.toFixed(2) : '***.**'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-lg font-semibold text-orange-600">
                ${showBalance ? pendingAmount.toFixed(2) : '***.**'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default WalletBalance;
