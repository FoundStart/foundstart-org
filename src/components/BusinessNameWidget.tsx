
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Sparkles, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const BusinessNameWidget = () => {
  const [keywords, setKeywords] = useState('');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [availabilityChecks, setAvailabilityChecks] = useState<{[key: string]: 'available' | 'taken' | 'checking'}>({});

  // Mock name generation (in real implementation, this would call Namelix API)
  const generateNames = async () => {
    if (!keywords.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock generated names based on keywords
    const mockNames = [
      `${keywords}Pro`,
      `${keywords}Hub`,
      `${keywords}Labs`,
      `Smart${keywords}`,
      `${keywords}Works`,
      `${keywords}Tech`,
      `${keywords}Co`,
      `${keywords}Solutions`
    ];
    
    setGeneratedNames(mockNames);
    setIsGenerating(false);
  };

  const checkAvailability = async (name: string) => {
    setAvailabilityChecks(prev => ({ ...prev, [name]: 'checking' }));
    
    // Simulate availability check
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock availability result (random for demo)
    const isAvailable = Math.random() > 0.5;
    setAvailabilityChecks(prev => ({ 
      ...prev, 
      [name]: isAvailable ? 'available' : 'taken' 
    }));
  };

  const openNamelix = () => {
    window.open('https://namelix.com/', '_blank');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <CardTitle>Business Name Generator</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={openNamelix}
            className="flex items-center space-x-1"
          >
            <span>Powered by Namelix</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Enter keywords for your business
            </label>
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., tech, consulting, design"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && generateNames()}
              />
              <Button 
                onClick={generateNames} 
                disabled={!keywords.trim() || isGenerating}
                className="flex items-center space-x-2"
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Generated Names */}
        {generatedNames.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Generated Names</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {generatedNames.map((name, index) => (
                <div 
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedName === name 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedName(name)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{name}</span>
                    <div className="flex items-center space-x-2">
                      {availabilityChecks[name] === 'checking' && (
                        <RefreshCw className="w-4 h-4 animate-spin text-gray-500" />
                      )}
                      {availabilityChecks[name] === 'available' && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Available
                        </Badge>
                      )}
                      {availabilityChecks[name] === 'taken' && (
                        <Badge variant="destructive">
                          <XCircle className="w-3 h-3 mr-1" />
                          Taken
                        </Badge>
                      )}
                      {!availabilityChecks[name] && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            checkAvailability(name);
                          }}
                        >
                          Check
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {name.toLowerCase().replace(/\s+/g, '')}.com
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Name */}
        {selectedName && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">Selected Business Name</h4>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-medium">{selectedName}</div>
                <div className="text-sm text-muted-foreground">
                  Domain: {selectedName.toLowerCase().replace(/\s+/g, '')}.com
                </div>
              </div>
              <Button 
                onClick={openNamelix}
                variant="outline"
                size="sm"
              >
                Refine on Namelix
              </Button>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">
            Need more creative options? Use our partner Namelix for AI-powered name generation.
          </p>
          <Button onClick={openNamelix} className="group">
            <span>Open Namelix</span>
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessNameWidget;
