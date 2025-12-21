import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, Link2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AffiliatesDashboard = () => {
  const { toast } = useToast();
  const referralLink = 'https://foundstart.org/ref/ABC123';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast({ title: 'Copied', description: 'Referral link copied to clipboard.' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Affiliate Program</h1>
        <p className="text-muted-foreground">Earn commissions by referring customers</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Commission Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>Share this link to earn commissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border bg-muted/50 px-3 py-2 text-sm">{referralLink}</div>
            <Button onClick={handleCopy}><Copy className="mr-2 h-4 w-4" />Copy</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliatesDashboard;
