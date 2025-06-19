
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bot, Brain, MessageSquare, Zap } from 'lucide-react';

const LLMOptimization = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            LLM Optimization (LLMO)
          </CardTitle>
          <CardDescription>
            Optimize your content for AI language models like ChatGPT, Claude, and Perplexity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="structured-data">Structured Data Schema</Label>
            <Textarea 
              id="structured-data"
              placeholder="JSON-LD structured data for AI comprehension..."
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entity-definitions">Entity Definitions</Label>
              <Textarea 
                id="entity-definitions"
                placeholder="Define key business entities and relationships..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="context-snippets">Context Snippets</Label>
              <Textarea 
                id="context-snippets"
                placeholder="Key information snippets for AI context..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="llm-prompts">Optimized Prompts</Label>
            <Textarea 
              id="llm-prompts"
              placeholder="Sample prompts and expected responses for AI training..."
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold">AI Readability</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <Badge variant="secondary">Excellent</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-green-500" />
                <h3 className="font-semibold">Context Clarity</h3>
              </div>
              <div className="text-2xl font-bold text-green-600">88%</div>
              <Badge variant="secondary">Good</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibold">Response Rate</h3>
              </div>
              <div className="text-2xl font-bold text-purple-600">76%</div>
              <Badge variant="secondary">Improving</Badge>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="h-4 w-4 text-orange-500" />
                <h3 className="font-semibold">LLM Score</h3>
              </div>
              <div className="text-2xl font-bold text-orange-600">85</div>
              <Badge variant="secondary">Good</Badge>
            </Card>
          </div>
          
          <div className="flex gap-2">
            <Button>Generate llms.txt</Button>
            <Button variant="outline">Test AI Responses</Button>
            <Button variant="outline">Optimize Context</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LLMOptimization;
