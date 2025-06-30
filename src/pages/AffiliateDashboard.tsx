
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Users, Link, TrendingUp, Copy, ExternalLink } from 'lucide-react';

const AffiliateDashboard = () => {
  const affiliateStats = {
    totalEarnings: "$2,450.00",
    monthlyEarnings: "$850.00",
    totalReferrals: 47,
    activeReferrals: 23,
    conversionRate: "12.5%",
    commissionRate: "25%"
  };

  const recentReferrals = [
    { id: 1, email: "john.doe@email.com", status: "Converted", commission: "$125.00", date: "Dec 15, 2024" },
    { id: 2, email: "sarah.j@email.com", status: "Pending", commission: "$0.00", date: "Dec 14, 2024" },
    { id: 3, email: "mike.chen@email.com", status: "Converted", commission: "$85.00", date: "Dec 12, 2024" },
    { id: 4, email: "lisa.r@email.com", status: "Converted", commission: "$125.00", date: "Dec 10, 2024" }
  ];

  const affiliateLinks = [
    { name: "Homepage", url: "https://foundstart.com/?ref=YOUR_CODE", clicks: 245 },
    { name: "Pricing Page", url: "https://foundstart.com/pricing/?ref=YOUR_CODE", clicks: 187 },
    { name: "LLC Formation", url: "https://foundstart.com/llc/?ref=YOUR_CODE", clicks: 156 },
    { name: "Banking Services", url: "https://foundstart.com/banking/?ref=YOUR_CODE", clicks: 98 }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">Affiliate Dashboard</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Earn up to 25% commission by referring customers to FoundStart. 
            Track your performance and manage your affiliate links.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="links">Affiliate Links</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{affiliateStats.totalEarnings}</div>
                  <p className="text-xs text-muted-foreground">All time earnings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{affiliateStats.monthlyEarnings}</div>
                  <p className="text-xs text-muted-foreground">December 2024</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{affiliateStats.totalReferrals}</div>
                  <p className="text-xs text-muted-foreground">{affiliateStats.activeReferrals} active</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{affiliateStats.conversionRate}</div>
                  <p className="text-xs text-muted-foreground">{affiliateStats.commissionRate} commission</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Referrals</CardTitle>
                <CardDescription>Your latest referral activity and earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReferrals.map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{referral.email}</p>
                          <p className="text-sm text-muted-foreground">{referral.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={referral.status === 'Converted' ? 'default' : 'secondary'}>
                          {referral.status}
                        </Badge>
                        <span className="font-medium text-green-600">{referral.commission}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Affiliate Links</CardTitle>
                <CardDescription>Use these links to refer customers and earn commissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {affiliateLinks.map((link, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{link.name}</h3>
                      <Badge variant="outline">{link.clicks} clicks</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input value={link.url} readOnly className="flex-1" />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(link.url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => window.open(link.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>All Referrals</CardTitle>
                <CardDescription>Complete history of your referrals and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReferrals.map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{referral.email}</p>
                        <p className="text-sm text-muted-foreground">Referred on {referral.date}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={referral.status === 'Converted' ? 'default' : 'secondary'}>
                          {referral.status}
                        </Badge>
                        <p className="text-sm font-medium text-green-600">{referral.commission}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-8">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Resources</CardTitle>
                  <CardDescription>Download banners, logos, and promotional materials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Download Logo Pack
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Banner Templates
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Email Templates
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Commission Structure</CardTitle>
                  <CardDescription>Understanding how you earn with FoundStart</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Standard Plans</h4>
                    <p className="text-sm text-muted-foreground mb-1">25% commission on all paid plans</p>
                    <p className="text-sm">$299 plan = $74.75 commission</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Premium Services</h4>
                    <p className="text-sm text-muted-foreground mb-1">30% commission on premium packages</p>
                    <p className="text-sm">$999 plan = $299.70 commission</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AffiliateDashboard;
