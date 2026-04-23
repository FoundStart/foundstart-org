import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DomainSearchMarketplace from '@/components/domains/DomainSearchMarketplace';

const DashboardDomains = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Domain Search & Marketplace</h1>
        <p className="text-muted-foreground">
          Search premium domains and manage your inquiries — all without leaving the dashboard.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find your perfect domain</CardTitle>
        </CardHeader>
        <CardContent>
          <DomainSearchMarketplace />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardDomains;
