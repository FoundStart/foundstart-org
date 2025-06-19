
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const WalletBalance = () => {
  const [showBalance, setShowBalance] = useState(true);
  
  // Mock data - will be replaced with real data from Supabase
  const balance = 1250.75;
  const availableBalance = 1200.00;
  const pendingAmount = 50.75;
  const monthlyGrowth = 12.5;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
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
              <Badge variant="secondary" className="text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{monthlyGrowth}%
              </Badge>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Account Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Verification</span>
              <Badge variant="default">Verified</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Daily Limit</span>
              <span className="text-sm font-medium">$5,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Monthly Limit</span>
              <span className="text-sm font-medium">$50,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletBalance;
