
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

  const digitalPartnersData = {
    'company establish': ['Privatily', 'Firstbase', 'ITIN', '1stFormations', 'Clemta', 'startglobal'],
    'banking': ['Mercury', 'Wise', 'Redotpay', 'Airtm', 'Payeer', 'Novel bank'],
    'crypto': ['Gate', 'Binance', 'ByBit', 'BingX', 'Bitget', 'OKX', 'KuCoin', 'HTX'],
    'ai tools': ['Claude', 'Manus', 'Creatify', 'Makereels', 'Heygen', 'Topviews', 'Arcads'],
    'automation': ['Pabbly', 'Flowise', 'Axiom', 'Wiza', 'Phantombuster', 'FlockSocial']
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('company') || message.includes('formation') || message.includes('establish')) {
      return `For company formation, we partner with leading providers like Privatily, Firstbase, ITIN, 1stFormations, Clemta, and startglobal. These partners can help you establish companies in the UK, USA, and Canada with streamlined processes. Would you like specific information about any of these services?`;
    }
    
    if (message.includes('bank') || message.includes('payment')) {
      return `We offer banking solutions through trusted partners including Mercury (USA Bank), Wise (Multi-currency), Redotpay (Virtual cards), Airtm, Payeer, and Novel bank. Each offers different benefits for business banking needs. Which banking service interests you most?`;
    }
    
    if (message.includes('crypto') || message.includes('bitcoin') || message.includes('exchange')) {
      return `Our crypto partners include major exchanges like Gate, Binance, ByBit, BingX, Bitget, OKX, KuCoin, and HTX. These platforms offer trading, P2P, and wallet services. Are you looking for a specific crypto service?`;
    }
    
    if (message.includes('ai') || message.includes('automation')) {
      return `We have AI and automation partners including Claude (LLM), Manus (AI), Creatify (AI UGC), Heygen, Pabbly (Business Automation), Flowise (AI Agents), and many more. What type of AI solution are you looking for?`;
    }
    
    if (message.includes('virtual card') || message.includes('esim') || message.includes('gift card')) {
      return `Great! We offer Virtual Cards (Visa/Mastercard), eSIM cards for global connectivity, and Gift Card issuing services. These are part of our comprehensive digital services package. Would you like to know more about any specific service?`;
    }
    
    if (message.includes('pricing') || message.includes('cost') || message.includes('price')) {
      return `We offer flexible pricing tiers starting from basic formation packages to comprehensive business solutions. Our packages include domain registration, hosting, business emails, website platforms, mobile apps, and 50% discounts on sister partners. Would you like to see our detailed pricing?`;
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
      return `Hello! I'm here to help you with FoundStart services. I can provide information about company formation, banking, digital partners, AI tools, virtual cards, eSIM services, and much more. What would you like to know?`;
    }
    
    return `I understand you're asking about "${userMessage}". FoundStart offers comprehensive business formation services with 230+ digital partners, 100+ freelancer platforms, and 57 sister companies. We can help with company formation, banking, virtual cards, eSIM, gift cards, and much more. Could you be more specific about what you'd like to know?`;
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
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50"
        size="lg"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
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
