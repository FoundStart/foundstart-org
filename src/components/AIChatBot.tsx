
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
      text: 'Hello! I\'m your FoundStart AI assistant. I can help you with information about our services, digital partners, and answer any questions about starting your business. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);

  const servicesData = {
    'company formation': ['USA ($299)', 'UK (£199)', 'Canada (CAD $399)', 'Estonia (€300)', 'Finland (€350)', 'Sweden (SEK 3,500)', 'Latvia (€250)', 'Lithuania (€280)', 'Egypt (Custom Quote)'],
    'digital services': ['Virtual Cards (Visa/Mastercard)', 'eSIM Global Connectivity', 'Gift Card Issuing', 'Domain Registration', 'Web Hosting', 'Business Email', 'Website Platforms', 'Mobile Apps'],
    'banking partners': ['Mercury (USA Bank)', 'Wise (Multi-currency)', 'Redotpay (Virtual Cards)', 'Airtm', 'Payeer', 'Novel Bank'],
    'crypto exchanges': ['Gate.io', 'Binance', 'ByBit', 'BingX', 'Bitget', 'OKX', 'KuCoin', 'HTX'],
    'ai tools': ['Claude AI', 'Manus LLM', 'Creatify', 'Heygen', 'Pictory', 'Fliki', 'Lovable AI', 'Cursor IDE'],
    'automation': ['Pabbly Connect', 'Flowise AI', 'Zapier', 'Wiza B2B', 'Phantombuster', 'Task Magic'],
    'business tools': ['460+ Digital Partners', '100+ Freelancer Platforms', '57 Sister Companies', 'SEO Tools', 'Email Marketing', 'Project Management']
  };

  const countriesInfo = {
    'usa': 'Company formation in USA ($299, 5-7 days) with partners: Privatily, ITIN, Clemta, Startglobal, doola. Benefits: US banking access, global credibility, flexible structures (LLC/Corp), tax advantages.',
    'uk': 'UK company formation (£199, 3-5 days) with partners: Firstbase, 1stFormations, Privatily, Rapid Formation. Benefits: EU market gateway, strong legal framework, UK banking access.',
    'canada': 'Canadian business formation (CAD $399, 7-10 days) with Privatily. Benefits: stable economy, NAFTA/USMCA access, skilled workforce, innovation incentives.',
    'estonia': 'Estonian company (€300, 3-5 days) with 1office. Benefits: e-Residency program, digital infrastructure, EU access, no tax on retained earnings.',
    'finland': 'Finnish company (€350, 5-7 days) with 1office. Benefits: innovative environment, educated workforce, R&D incentives, EU access.',
    'sweden': 'Swedish business (SEK 3,500, 5-7 days) with 1office. Benefits: innovation leadership, skilled workforce, EU access, sustainability focus.',
    'latvia': 'Latvian company (€250, 3-5 days) with 1office. Benefits: strategic Baltic location, cost-effective operations, EU access.',
    'lithuania': 'Lithuanian business (€280, 3-5 days) with 1office. Benefits: growing economy, competitive costs, strong fintech sector.',
    'egypt': 'Egyptian company formation with expert guidance. 6 company structures under Investment Law 72/2017, 100% foreign ownership allowed, gateway to MENA.'
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Country-specific queries
    if (message.includes('usa') || message.includes('america') || message.includes('united states')) {
      return countriesInfo.usa;
    }
    if (message.includes('uk') || message.includes('britain') || message.includes('united kingdom')) {
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
    if (message.includes('company') || message.includes('formation') || message.includes('establish')) {
      return `FoundStart offers company formation in 9 countries: ${servicesData['company formation'].join(', ')}. We work with trusted partners like Privatily, Firstbase, ITIN, 1stFormations, and more. Which country interests you for your business formation?`;
    }
    
    if (message.includes('digital nomad') || message.includes('visa')) {
      return `We also provide Digital Nomad Visa guidance for 73+ countries including Spain, Portugal, Estonia, Croatia, Greece, and many more. Each country has different requirements for income, duration (6 months to 2 years), and benefits. Which nomad destination interests you?`;
    }
    
    if (message.includes('bank') || message.includes('payment')) {
      return `Banking solutions: ${servicesData['banking partners'].join(', ')}. Each offers different benefits - Mercury for US banking, Wise for multi-currency, Redotpay for virtual cards. What banking feature do you need?`;
    }
    
    if (message.includes('crypto') || message.includes('bitcoin') || message.includes('exchange')) {
      return `Crypto partners: ${servicesData['crypto exchanges'].join(', ')}. These platforms offer trading, P2P, staking, and wallet services. Looking for any specific crypto service?`;
    }
    
    if (message.includes('ai') || message.includes('automation')) {
      return `AI & Automation tools: ${servicesData['ai tools'].slice(0, 4).join(', ')} and ${servicesData['automation'].slice(0, 3).join(', ')}. We have 460+ digital partners including coding AI, video AI, voice AI, and business automation. What AI solution interests you?`;
    }
    
    if (message.includes('virtual card') || message.includes('esim') || message.includes('gift card')) {
      return `Digital services: ${servicesData['digital services'].slice(0, 4).join(', ')}. Our virtual cards work globally (Visa/Mastercard), eSIM provides instant connectivity worldwide, and we offer gift card issuing services. Which service do you need?`;
    }
    
    if (message.includes('partner') || message.includes('platform')) {
      return `We have ${servicesData['business tools'][0]}, ${servicesData['business tools'][1]}, and ${servicesData['business tools'][2]}. Our ecosystem includes company formation, fintech, AI tools, automation, e-commerce, marketing, and freelancer platforms. What type of partnership interests you?`;
    }
    
    if (message.includes('pricing') || message.includes('cost') || message.includes('price')) {
      return `Pricing varies by service: Company formation from $199-$399, Digital services start at competitive rates, 50% discounts on sister partners. We offer flexible packages including domain, hosting, emails, websites, and mobile apps. Need pricing for a specific service?`;
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
      return `Hello! I'm your FoundStart AI assistant. I can help with: 🌍 Company formation in 9 countries, 💳 Banking & fintech solutions, 🤖 460+ digital partners, 📱 Digital services (virtual cards, eSIM), 🏖️ Digital nomad visas, and much more. What interests you?`;
    }
    
    return `I understand you're asking about "${userMessage}". FoundStart is your global business formation partner with services in 9 countries, 460+ digital partners, 100+ freelancer platforms, and comprehensive digital services. We help with company formation, banking, virtual cards, eSIM, AI tools, and digital nomad guidance. What specific service can I help you with?`;
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
    }, 1000);

    setInputValue('');
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Voice functionality would be implemented here
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
            FoundStart AI Assistant
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
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 text-sm ${
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
                placeholder="Ask me anything about FoundStart..."
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
