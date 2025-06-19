
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Navigation, Target } from 'lucide-react';

const GEOOptimization = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Geographic Optimization (GEO)
          </CardTitle>
          <CardDescription>
            Optimize your business for location-based searches and local SEO
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-address">Business Address</Label>
              <Input 
                id="business-address"
                placeholder="123 Business St, City, State 12345"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-areas">Service Areas</Label>
              <Input 
                id="service-areas"
                placeholder="USA, UK, Canada, Global"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="local-keywords">Local Keywords</Label>
              <Textarea 
                id="local-keywords"
                placeholder="business formation USA, startup services NYC, company registration California..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="geo-content">Location-Specific Content</Label>
              <Textarea 
                id="geo-content"
                placeholder="Content tailored for specific geographic regions..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="business-hours">Business Hours by Region</Label>
            <Textarea 
              id="business-hours"
              placeholder="USA: 9AM-6PM EST, UK: 9AM-5PM GMT, Global: 24/7 Support..."
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold">Global Reach</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600">25</div>
              <Badge variant="secondary">Countries</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="h-4 w-4 text-green-500" />
                <h3 className="font-semibold">Local Rankings</h3>
              </div>
              <div className="text-2xl font-bold text-green-600">Top 5</div>
              <Badge variant="secondary">Average</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibold">Location CTR</h3>
              </div>
              <div className="text-2xl font-bold text-purple-600">8.2%</div>
              <Badge variant="secondary">Good</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <h3 className="font-semibold">GEO Score</h3>
              </div>
              <div className="text-2xl font-bold text-orange-600">78</div>
              <Badge variant="secondary">Improving</Badge>
            </Card>
          </div>
          
          <div className="flex gap-2">
            <Button>Optimize Local SEO</Button>
            <Button variant="outline">Submit to Directories</Button>
            <Button variant="outline">Generate Local Content</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GEOOptimization;
