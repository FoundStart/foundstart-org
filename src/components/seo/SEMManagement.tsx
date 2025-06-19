
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Target, TrendingUp, MousePointer } from 'lucide-react';

const SEMManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Search Engine Marketing (SEM)
          </CardTitle>
          <CardDescription>
            Manage paid search campaigns across Google Ads, Bing Ads, and other platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-budget">Daily Budget</Label>
              <Input 
                id="campaign-budget"
                placeholder="$500"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-cpc">Target CPC</Label>
              <Input 
                id="target-cpc"
                placeholder="$2.50"
                type="number"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ad-keywords">Paid Keywords</Label>
            <Textarea 
              id="ad-keywords"
              placeholder="business formation, start a company, LLC registration, business setup..."
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ad-copy">Ad Copy</Label>
              <Textarea 
                id="ad-copy"
                placeholder="Start Your Business Today! Form LLC, Get EIN, Open Bank Account - All in One Platform"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="negative-keywords">Negative Keywords</Label>
              <Textarea 
                id="negative-keywords"
                placeholder="free, cheap, DIY, template..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold">CTR</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600">3.2%</div>
              <Badge variant="secondary">Good</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <h3 className="font-semibold">CPC</h3>
              </div>
              <div className="text-2xl font-bold text-green-600">$2.80</div>
              <Badge variant="secondary">Target</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibold">Conversion</h3>
              </div>
              <div className="text-2xl font-bold text-purple-600">12%</div>
              <Badge variant="secondary">Excellent</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <h3 className="font-semibold">ROAS</h3>
              </div>
              <div className="text-2xl font-bold text-orange-600">4.2x</div>
              <Badge variant="secondary">Strong</Badge>
            </Card>
          </div>
          
          <div className="flex gap-2">
            <Button>Launch Campaign</Button>
            <Button variant="outline">A/B Test Ads</Button>
            <Button variant="outline">Optimize Bids</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEMManagement;
