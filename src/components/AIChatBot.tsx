import { useState } from 'react';
import { MessageSquare, Send, Mic, MicOff, X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your FoundStart AI assistant. I can help you with company formation, domain search, digital services, and more. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);

  const servicesData = {
    'company formation': {
      countries: ['USA ($299-$599)', 'UK (£199-£399)', 'Canada (CAD $399)', 'Estonia (€300)', 'Finland (€350)', 'Sweden (SEK 3,500)', 'Latvia (€250)', 'Lithuania (€280)', 'Egypt (Custom Quote)'],
      entities: ['LLC', 'C-Corp', 'S-Corp', 'Ltd', 'GmbH', 'BV', 'SAS'],
      features: ['Registered Agent', 'EIN Number', 'Operating Agreement', 'Business Address']
    },
    'domains': {
      total: '170+ premium domains available',
      categories: ['Startups & SaaS', 'E-Commerce', 'Fintech & Crypto', 'Social Media', 'AI & Automation'],
      platforms: ['Spaceship', 'GoDaddy', 'Hostinger', 'Unstoppable Domains', 'Sedo', 'Dynadot', 'Atom', 'Namesilo', 'Saw', 'Namebright', 'Dropcatch', 'Porkbun', 'Nameclub', 'Nameshift', 'Namebase', 'Namecheap'],
      pricing: 'Domains from $59 to $2,500'
    },
    'digital services': {
      hosting: 'Premium web hosting with 99.9% uptime',
      email: 'Professional business email',
      website: 'SAAS-ready website platforms',
      mobile: 'Android, iOS & Harmony apps',
      virtualCards: 'Visa & Mastercard virtual cards',
      esim: 'Global eSIM connectivity',
      giftCards: 'Digital gift card platform'
    },
    'banking': {
      partners: ['Mercury (USA)', 'Wise (Multi-currency)', 'Redotpay (Virtual Cards)', 'WorldFirst', 'Payoneer'],
      features: 'US banking, multi-currency accounts, virtual cards'
    },
    'seo': {
      services: ['Traditional SEO', 'Local SEO', 'LLM Optimization (LLMO)', 'Answer Engine Optimization (AEO)', 'Geographic Optimization (GEO)', 'App Store Optimization (ASO)', 'Search Engine Marketing (SEM)'],
      description: 'Complete search visibility solutions'
    },
    'hiring': {
      services: ['Virtual Assistants', 'Data Entry', 'Customer Support', 'Content Writing', 'Graphic Design', 'Video Editing', 'Translation', 'Social Media Management', 'Lead Generation', 'Bookkeeping', 'Web Development', 'SEO & Link Building'],
      platforms: '100+ freelancer platforms'
    }
  };

  const countriesInfo = {
    'usa': 'USA company formation: LLC from $299, C-Corp from $399. Benefits: US banking access, global credibility, flexible structures, tax advantages. Formation time: 5-7 business days.',
    'uk': 'UK company formation: Ltd from £199. Benefits: EU market gateway, strong legal framework, UK banking access. Formation time: 24-48 hours.',
    'canada': 'Canada business formation: CAD $399. Benefits: Stable economy, NAFTA/USMCA access, skilled workforce, innovation incentives. Formation time: 7-10 days.',
    'estonia': 'Estonia company: €300. Benefits: e-Residency program, digital infrastructure, EU access, no tax on retained earnings. Formation time: 3-5 days.',
    'finland': 'Finland company: €350. Benefits: Innovative environment, educated workforce, R&D incentives, EU access. Formation time: 5-7 days.',
    'sweden': 'Sweden business: SEK 3,500. Benefits: Innovation leadership, skilled workforce, EU access, sustainability focus. Formation time: 5-7 days.',
    'latvia': 'Latvia company: €250. Benefits: Strategic Baltic location, cost-effective operations, EU access. Formation time: 3-5 days.',
    'lithuania': 'Lithuania business: €280. Benefits: Growing economy, competitive costs, strong fintech sector. Formation time: 3-5 days.',
    'egypt': 'Egypt company formation with expert guidance. 6 company structures under Investment Law 72/2017, 100% foreign ownership allowed, gateway to MENA region.'
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Domain-specific queries
    if (message.includes('domain') && (message.includes('search') || message.includes('find') || message.includes('buy'))) {
      return `🔍 **Domain Search**\n\nWe offer:\n• ${servicesData.domains.total}\n• Search across ${servicesData.domains.platforms.length} platforms: ${servicesData.domains.platforms.slice(0, 6).join(', ')}, and more\n• Categories: ${servicesData.domains.categories.join(', ')}\n• ${servicesData.domains.pricing}\n\nVisit /domains to search or browse our collection!`;
    }

    if (message.includes('domain') && (message.includes('price') || message.includes('cost'))) {
      return `💰 **Domain Pricing**\n\n• Standard domains: From $59\n• Premium business domains: From $2,500\n• Registration: $5.99 - $11.99/year depending on hosting\n\nWe have domains on UD, Spaceship, GoDaddy, Hostinger, and Namebright.`;
    }

    // Country-specific queries
    if (message.includes('usa') || message.includes('america') || message.includes('united states') || message.includes('us company')) {
      return countriesInfo.usa;
    }
    if (message.includes('uk') || message.includes('britain') || message.includes('united kingdom') || message.includes('england')) {
      return countriesInfo.uk;
    }
    if (message.includes('canada')) {
      return countriesInfo.canada;
    }
    if (message.includes('estonia')) {
      return countriesInfo.estonia;
    }
    if (message.includes('finland')) {
      return countriesInfo.finland;
    }
    if (message.includes('sweden')) {
      return countriesInfo.sweden;
    }
    if (message.includes('latvia')) {
      return countriesInfo.latvia;
    }
    if (message.includes('lithuania')) {
      return countriesInfo.lithuania;
    }
    if (message.includes('egypt')) {
      return countriesInfo.egypt;
    }
    
    // Service-specific queries
    if (message.includes('company') || message.includes('formation') || message.includes('llc') || message.includes('corp')) {
      return `🏢 **Company Formation**\n\nWe offer formation in 9 countries:\n${servicesData['company formation'].countries.join('\n')}\n\nEntity types: ${servicesData['company formation'].entities.join(', ')}\n\nAdd-ons: ${servicesData['company formation'].features.join(', ')}\n\nUse our pricing calculator at /pricing-calculator for exact costs!`;
    }
    
    if (message.includes('seo') || message.includes('llmo') || message.includes('optimization')) {
      return `📈 **SEO & Optimization Services**\n\n${servicesData.seo.description}\n\nServices:\n• ${servicesData.seo.services.join('\n• ')}\n\nVisit /seo-management for more details!`;
    }

    if (message.includes('bank') || message.includes('payment') || message.includes('mercury') || message.includes('wise')) {
      return `🏦 **Banking Solutions**\n\nPartners: ${servicesData.banking.partners.join(', ')}\n\n${servicesData.banking.features}\n\nWe help you open business bank accounts after company formation.`;
    }
    
    if (message.includes('virtual card') || message.includes('esim') || message.includes('gift card')) {
      return `💳 **Digital Services**\n\n• Virtual Cards: ${servicesData['digital services'].virtualCards}\n• eSIM: ${servicesData['digital services'].esim}\n• Gift Cards: ${servicesData['digital services'].giftCards}\n\nPerfect for digital nomads and remote businesses!`;
    }
    
    if (message.includes('hosting') || message.includes('website') || message.includes('email')) {
      return `🌐 **Web Services**\n\n• Hosting: ${servicesData['digital services'].hosting}\n• Email: ${servicesData['digital services'].email}\n• Website: ${servicesData['digital services'].website}\n• Mobile Apps: ${servicesData['digital services'].mobile}`;
    }

    if (message.includes('hire') || message.includes('freelance') || message.includes('virtual assistant') || message.includes('remote')) {
      return `👥 **Remote Hiring Services**\n\n${servicesData.hiring.platforms}\n\nServices available:\n• ${servicesData.hiring.services.join('\n• ')}\n\nVisit /freelancer-partners to explore!`;
    }
    
    if (message.includes('pricing') || message.includes('cost') || message.includes('price') || message.includes('how much')) {
      return `💵 **Pricing Overview**\n\n• Company Formation: $199 - $599\n• Premium Domains: $59 - $2,500\n• Web Hosting: From $9.99/month\n• Virtual Cards: From $2.99/month\n• eSIM: From $4.99\n\nUse our pricing calculator at /pricing-calculator for detailed quotes!`;
    }
    
    if (message.includes('digital nomad') || message.includes('visa') || message.includes('travel')) {
      return `🌍 **Digital Nomad Services**\n\nWe provide guidance for Digital Nomad Visas in 73+ countries including Spain, Portugal, Estonia, Croatia, Greece, and more.\n\nAlso offering:\n• Global eSIM connectivity\n• Virtual business addresses\n• Remote banking solutions\n\nVisit /digital-nomad-visas for details!`;
    }
    
    if (message.includes('dashboard') || message.includes('account') || message.includes('login')) {
      return `🎛️ **Your Dashboard**\n\nAccess your dashboard at /dashboard for:\n• Company management\n• Service orders\n• Document center\n• AI assistant\n• Billing & payments\n• Affiliate program\n\nSign up at /auth to get started!`;
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('help') || message.includes('hey')) {
      return `👋 Hello! Welcome to FoundStart!\n\nI can help you with:\n\n🏢 Company Formation (9 countries)\n🌐 Domain Search (170+ domains, 16 platforms)\n💻 Web Services (hosting, email, apps)\n🏦 Banking Solutions\n📈 SEO & Marketing\n👥 Remote Hiring\n🌍 Digital Nomad Services\n\nWhat would you like to know more about?`;
    }
    
    return `I understand you're asking about "${userMessage}".\n\n**FoundStart offers:**\n• Company formation in 9 countries\n• 170+ premium domains\n• 16+ domain search platforms\n• Web hosting & email\n• Banking solutions\n• SEO & marketing\n• Remote hiring services\n\nCould you be more specific about what you need? I'm here to help! 🚀`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 800);

    setInputValue('');
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 lg:bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50"
        size="lg"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-20 lg:bottom-6 right-6 w-80 lg:w-96 h-[500px] max-h-[calc(100vh-140px)] lg:max-h-[500px] shadow-xl z-50 flex flex-col mx-2 lg:mx-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            FoundStart AI
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full px-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 text-sm whitespace-pre-line ${
                        message.isBot
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about services, domains, formation..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={toggleVoice}
                className={isListening ? 'bg-red-500 text-white' : ''}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button onClick={handleSendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default AIChatBot;
