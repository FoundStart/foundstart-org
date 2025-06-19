
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Star, Download, Users } from 'lucide-react';

const ASOOptimization = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            App Store Optimization (ASO)
          </CardTitle>
          <CardDescription>
            Optimize your mobile app visibility in app stores (iOS App Store, Google Play Store)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="app-title">App Title</Label>
              <Input 
                id="app-title"
                placeholder="StartupLaunchpad - Business Formation"
                maxLength={30}
              />
              <p className="text-sm text-muted-foreground">30 characters max</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="app-subtitle">App Subtitle</Label>
              <Input 
                id="app-subtitle"
                placeholder="Launch Your Business in Minutes"
                maxLength={30}
              />
              <p className="text-sm text-muted-foreground">30 characters max</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="app-keywords">Keywords</Label>
            <Textarea 
              id="app-keywords"
              placeholder="business, startup, formation, company, register, launch..."
              rows={2}
            />
            <p className="text-sm text-muted-foreground">Separate with commas, 100 characters max</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="app-description">App Description</Label>
            <Textarea 
              id="app-description"
              placeholder="Detailed app description for app store..."
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <h3 className="font-semibold">App Rating</h3>
              </div>
              <div className="text-2xl font-bold text-yellow-600">4.8</div>
              <Badge variant="secondary">Excellent</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Download className="h-4 w-4 text-green-500" />
                <h3 className="font-semibold">Downloads</h3>
              </div>
              <div className="text-2xl font-bold text-green-600">50K+</div>
              <Badge variant="secondary">Growing</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold">Active Users</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600">12K</div>
              <Badge variant="secondary">Engaged</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibola">ASO Score</h3>
              </div>
              <div className="text-2xl font-bold text-purple-600">82</div>
              <Badge variant="secondary">Good</Badge>
            </Card>
          </div>
          
          <div className="flex gap-2">
            <Button>Optimize Keywords</Button>
            <Button variant="outline">A/B Test Screenshots</Button>
            <Button variant="outline">Generate App Preview</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ASOOptimization;
