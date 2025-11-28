import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, Plus, Minus, History, CreditCard, DollarSign } from 'lucide-react';
import WalletBalance from './WalletBalance';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';
import TransactionHistory from './TransactionHistory';

const WalletDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Digital Wallet</h1>
            <p className="text-sm text-muted-foreground">Manage your funds securely</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="overview" className="flex flex-col sm:flex-row items-center gap-1 py-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="deposit" className="flex flex-col sm:flex-row items-center gap-1 py-2">
            <Plus className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Deposit</span>
          </TabsTrigger>
          <TabsTrigger value="withdraw" className="flex flex-col sm:flex-row items-center gap-1 py-2">
            <Minus className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Withdraw</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex flex-col sm:flex-row items-center gap-1 py-2">
            <History className="w-4 h-4" />
            <span className="text-xs sm:text-sm">History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6 mt-4">
          <WalletBalance />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Quick Deposit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <p className="text-sm text-muted-foreground">Add funds to your wallet instantly</p>
                <Button 
                  onClick={() => setActiveTab('deposit')} 
                  className="w-full"
                  size="default"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Deposit Funds
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                  Quick Withdraw
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <p className="text-sm text-muted-foreground">Transfer funds to your bank account</p>
                <Button 
                  onClick={() => setActiveTab('withdraw')} 
                  variant="outline" 
                  className="w-full"
                  size="default"
                >
                  <Minus className="w-4 h-4 mr-2" />
                  Withdraw Funds
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deposit" className="mt-4">
          <DepositForm />
        </TabsContent>

        <TabsContent value="withdraw" className="mt-4">
          <WithdrawForm />
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <TransactionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WalletDashboard;
