
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Image, Tag, Globe } from 'lucide-react';

const MetaManager = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Meta Tags & Social Media Manager
          </CardTitle>
          <CardDescription>
            Manage meta titles, descriptions, Open Graph, Twitter Cards, and social media previews
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="meta-title">Meta Title</Label>
            <Input 
              id="meta-title"
              placeholder="StartupLaunchpad - Launch Your Business in Minutes"
              maxLength={60}
            />
            <p className="text-sm text-muted-foreground">60 characters max</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea 
              id="meta-description"
              placeholder="The all-in-one platform for company formation, banking, and payments. Start your business in the USA, UK, or Canada with our AI-powered wizard."
              maxLength={160}
              rows={3}
            />
            <p className="text-sm text-muted-foreground">160 characters max</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="og-title">Open Graph Title</Label>
              <Input 
                id="og-title"
                placeholder="StartupLaunchpad - Launch Your Business in Minutes"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter-title">Twitter Title</Label>
              <Input 
                id="twitter-title"
                placeholder="StartupLaunchpad - Launch Your Business in Minutes"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="og-image">Social Media Preview Image URL</Label>
            <Input 
              id="og-image"
              placeholder="https://lovable.dev/opengraph-image-p98pqg.png"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="canonical-url">Canonical URL</Label>
              <Input 
                id="canonical-url"
                placeholder="https://yourdomain.com/"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="robots-meta">Robots Meta</Label>
              <Input 
                id="robots-meta"
                placeholder="index, follow"
              />
            </div>
          </div>
          
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Social Media Preview
            </h3>
            <div className="bg-muted p-4 rounded-lg">
              <div className="bg-background rounded border p-3 space-y-2">
                <div className="w-full h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                <h4 className="font-semibold text-blue-600">StartupLaunchpad - Launch Your Business in Minutes</h4>
                <p className="text-sm text-muted-foreground">The all-in-one platform for company formation, banking, and payments. Start your business in the USA, UK, or Canada...</p>
                <p className="text-xs text-muted-foreground">yourdomain.com</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold">Title Length</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600">52</div>
              <Badge variant="secondary">Good</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-green-500" />
                <h3 className="font-semibold">Desc Length</h3>
              </div>
              <div className="text-2xl font-bold text-green-600">145</div>
              <Badge variant="secondary">Perfect</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Image className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibold">OG Image</h3>
              </div>
              <div className="text-2xl font-bold text-purple-600">✓</div>
              <Badge variant="secondary">Set</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-orange-500" />
                <h3 className="font-semibold">Social Score</h3>
              </div>
              <div className="text-2xl font-bold text-orange-600">95</div>
              <Badge variant="secondary">Excellent</Badge>
            </Card>
          </div>
          
          <div className="flex gap-2">
            <Button>Update Meta Tags</Button>
            <Button variant="outline">Preview Social Share</Button>
            <Button variant="outline">Generate Schema</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaManager;
