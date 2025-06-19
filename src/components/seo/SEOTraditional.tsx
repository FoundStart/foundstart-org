
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Target, TrendingUp, BarChart3 } from 'lucide-react';

const SEOTraditional = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Traditional SEO Optimization
          </CardTitle>
          <CardDescription>
            Optimize your website for traditional search engines like Google, Bing, and Yahoo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target-keywords">Target Keywords</Label>
              <Textarea 
                id="target-keywords"
                placeholder="business formation, startup launchpad, company registration..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description</Label>
              <Textarea 
                id="meta-description"
                placeholder="Compelling description for search results..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold">Keyword Density</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600">2.3%</div>
              <Badge variant="secondary">Optimal</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <h3 className="font-semibold">SEO Score</h3>
              </div>
              <div className="text-2xl font-bold text-green-600">87/100</div>
              <Badge variant="secondary">Good</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibold">Page Speed</h3>
              </div>
              <div className="text-2xl font-bold text-purple-600">94</div>
              <Badge variant="secondary">Excellent</Badge>
            </Card>
          </div>
          
          <div className="flex gap-2">
            <Button>Analyze SEO</Button>
            <Button variant="outline">Generate Sitemap</Button>
            <Button variant="outline">Check Backlinks</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOTraditional;
