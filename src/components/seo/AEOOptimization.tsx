
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mic, HelpCircle, Lightbulb } from 'lucide-react';

const AEOOptimization = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Answer Engine Optimization (AEO)
          </CardTitle>
          <CardDescription>
            Optimize for featured snippets, voice search, and answer engines like Perplexity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="faq-questions">FAQ Questions & Answers</Label>
            <Textarea 
              id="faq-questions"
              placeholder="Q: How to start a business in the USA? A: To start a business in the USA, you need to..."
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voice-queries">Voice Search Queries</Label>
              <Textarea 
                id="voice-queries"
                placeholder="How do I register a company?, What is the cheapest way to start a business?..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured-snippets">Featured Snippet Content</Label>
              <Textarea 
                id="featured-snippets"
                placeholder="Concise, direct answers optimized for snippets..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="how-to-guides">Step-by-Step Guides</Label>
            <Textarea 
              id="how-to-guides"
              placeholder="1. Choose business structure 2. Register with state 3. Get EIN number..."
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mic className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold">Voice Search</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600">15%</div>
              <Badge variant="secondary">Share</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="h-4 w-4 text-green-500" />
                <h3 className="font-semibold">Snippets Won</h3>
              </div>
              <div className="text-2xl font-bold text-green-600">12</div>
              <Badge variant="secondary">Active</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibold">Answer Rate</h3>
              </div>
              <div className="text-2xl font-bold text-purple-600">68%</div>
              <Badge variant="secondary">Good</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-4 w-4 text-orange-500" />
                <h3 className="font-semibold">AEO Score</h3>
              </div>
              <div className="text-2xl font-bold text-orange-600">79</div>
              <Badge variant="secondary">Growing</Badge>
            </Card>
          </div>
          
          <div className="flex gap-2">
            <Button>Optimize for Snippets</Button>
            <Button variant="outline">Voice Search Test</Button>
            <Button variant="outline">Generate FAQ Schema</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AEOOptimization;
