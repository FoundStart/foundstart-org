import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useWalletData } from './useWalletData';

const WithdrawForm = () => {
  const { balance } = useWalletData();
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Withdraw Funds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">Available balance: <span className="font-semibold">${balance.toFixed(2)}</span></p>
        <p className="text-sm text-muted-foreground">
          Online withdrawals are not available yet. Wallet funds can be used for FoundStart services. To withdraw a balance, contact support and we will process it manually.
        </p>
        <Button asChild variant="outline"><Link to="/dashboard/support">Contact Support</Link></Button>
      </CardContent>
    </Card>
  );
};

export default WithdrawForm;
