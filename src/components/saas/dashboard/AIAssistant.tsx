import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bot,
  Send,
  Save,
  Copy,
  Sparkles,
  Building2,
  FileText,
  Megaphone,
  Lightbulb,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const promptCategories = [
  {
    id: 'formation',
    name: 'Company Formation',
    icon: Building2,
    prompts: [
      'Generate a step-by-step checklist to form a US LLC',
      'Explain requirements to open a UK LTD company',
      'Create a GmbH formation timeline for Germany',
      'Compare LLC vs C-Corp for my business',
    ],
  },
  {
    id: 'legal',
    name: 'Legal Documents',
    icon: FileText,
    prompts: [
      'Draft an operating agreement for a US LLC',
      'Create a shareholder agreement template',
      'Generate a Non-Disclosure Agreement (NDA)',
      'Write terms of service for my company',
    ],
  },
  {
    id: 'business',
    name: 'Business & Branding',
    icon: Lightbulb,
    prompts: [
      'Generate 10 unique business name ideas for a tech startup',
      'Write a compelling company description',
      'Create a mission and vision statement',
      'Generate tagline ideas for my brand',
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: Megaphone,
    prompts: [
      'Write website homepage copy for a SaaS company',
      'Create an email outreach sequence',
      'Generate pitch deck outline',
      'Write social media content for launch',
    ],
  },
];

const AIAssistant = () => {
  const [selectedCategory, setSelectedCategory] = useState('formation');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter a prompt or select a template.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulated AI response - in production, this would call the AI API
    setTimeout(() => {
      setOutputText(`Here's a comprehensive response to your request:

**${inputText}**

Based on your query, here are the key points to consider:

1. **Initial Steps**: Begin by researching the specific requirements for your chosen jurisdiction. Each country has unique regulations and processes.

2. **Documentation**: Prepare all necessary documentation including identification, proof of address, and business plans.

3. **Timeline**: Typical formation takes 1-4 weeks depending on the jurisdiction and entity type.

4. **Costs**: Formation fees vary by location, typically ranging from $100-$1,000 for basic formation.

5. **Ongoing Compliance**: After formation, maintain good standing through annual filings and registered agent services.

Need more specific guidance? Feel free to ask follow-up questions!`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSelectPrompt = (prompt: string) => {
    setInputText(prompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: 'Copied',
      description: 'Output copied to clipboard.',
    });
  };

  const handleSaveAsDocument = () => {
    toast({
      title: 'Saved',
      description: 'Output saved to your Documents.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">AI Assistant</h1>
        <p className="text-muted-foreground">Generate business content with AI</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Prompt Templates */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Prompt Templates
            </CardTitle>
            <CardDescription>Select a template to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid grid-cols-2 w-full">
                {promptCategories.slice(0, 2).map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsList className="grid grid-cols-2 w-full mt-2">
                {promptCategories.slice(2).map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {promptCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-4 space-y-2">
                  {category.prompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full h-auto py-2 px-3 text-left justify-start text-wrap"
                      onClick={() => handleSelectPrompt(prompt)}
                    >
                      <span className="text-sm">{prompt}</span>
                    </Button>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Main AI Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Prompt</label>
              <Textarea
                placeholder="Enter your prompt or edit the selected template..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
              />
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !inputText.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>

            {/* Output */}
            {outputText && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">AI Output</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSaveAsDocument}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border bg-muted/50 p-4">
                  <pre className="whitespace-pre-wrap text-sm">{outputText}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;
