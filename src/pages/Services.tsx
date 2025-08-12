import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  MessageSquare, 
  Globe, 
  Smartphone, 
  Facebook, 
  Instagram, 
  Phone, 
  Mail,
  Zap,
  ShoppingCart,
  Search,
  Headphones,
  Code,
  Palette,
  Building,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Services = () => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Sent!",
      description: "We'll get back to you within 24 hours with a custom quote.",
    });
    // Reset form
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    setSelectedService('');
  };

  const services = [
    {
      category: "Business Formation Solutions",
      icon: <Building className="w-6 h-6" />,
      items: [
        { 
          name: "Option 1: Quick Setup with Partners", 
          price: "From $199", 
          description: "Instant access to 400+ vetted formation partners across 8 countries",
          action: "partners",
          actionText: "View Partners"
        },
        { 
          name: "Option 2: Custom Formation Service", 
          price: "Custom Quote", 
          description: "Personalized business formation with dedicated support and dashboard access",
          action: "quote",
          actionText: "Get Quote"
        },
        { 
          name: "USA Company Formation", 
          price: "From $299", 
          description: "Delaware LLC with EIN, registered agent, and banking setup" 
        },
        { 
          name: "UK Company Formation", 
          price: "From £199", 
          description: "Companies House registration with London address and UTR application" 
        },
        { 
          name: "Canada Company Formation", 
          price: "From CAD $399", 
          description: "Federal incorporation with business number and Toronto office" 
        },
        { 
          name: "EU Company Formation", 
          price: "From €250", 
          description: "Estonia, Finland, Sweden, Latvia, Lithuania - EU market access" 
        }
      ]
    },
    {
      category: "AI Chat Bots & Voice Solutions",
      icon: <Bot className="w-6 h-6" />,
      items: [
        { name: "Website AI Bot (Text-Voice)", price: "$49", description: "Intelligent chatbot for your website with text and voice capabilities" },
        { name: "Facebook Page AI Bot", price: "$49", description: "Automated customer service for Facebook pages" },
        { name: "Instagram Page AI Bot", price: "$49", description: "Smart bot for Instagram direct messages and comments" },
        { name: "WhatsApp AI Bot (Text-Voice)", price: "$49", description: "WhatsApp business automation with voice support" },
        { name: "Telegram AI Bot (Text-Voice)", price: "$49", description: "Telegram channel and group automation" },
        { name: "AI Voice Customer Agents", price: "Custom", description: "Replace human customer service with AI voice agents" },
        { name: "AI Cold Calls Agents", price: "Custom", description: "Automated cold calling system with AI" }
      ]
    },
    {
      category: "AI Automation & Workflows",
      icon: <Zap className="w-6 h-6" />,
      items: [
        { name: "AI Automation Standard (Form-Link)", price: "$49", description: "Basic automation for forms and links per business" },
        { name: "AI Automation Custom Workflow Templates", price: "$5", description: "Pre-built workflow templates for automation" },
        { name: "AI Automation Workflows Company-wide", price: "Custom", description: "Complete automation solution for entire company" }
      ]
    },
    {
      category: "Website & Mobile Development",
      icon: <Globe className="w-6 h-6" />,
      items: [
        { name: "Website Templates", price: "From $99", description: "Professional website templates ready to use" },
        { name: "Mobile APP Templates", price: "From $149", description: "Mobile application templates for iOS and Android" },
        { name: "Websites for Sale", price: "Custom", description: "Ready-made websites with established traffic" },
        { name: "Mobile APP for Sale", price: "Custom", description: "Developed mobile applications ready for launch" },
        { name: "WordPress Solutions", price: "From $29", description: "Plugins, themes, and templates for WordPress" },
        { name: "E-Commerce Website", price: "From $499", description: "Complete online store with payment integration" },
        { name: "Online Shops", price: "From $299", description: "Professional online shopping platforms" }
      ]
    },
    {
      category: "Digital Marketing & SEO",
      icon: <Search className="w-6 h-6" />,
      items: [
        { name: "Digital Marketing", price: "From $199/mo", description: "Complete digital marketing campaigns" },
        { name: "Social Media Marketing", price: "From $149/mo", description: "Social media management and growth" },
        { name: "SEO & SEM Services", price: "From $299/mo", description: "Search engine optimization and marketing" }
      ]
    },
    {
      category: "Business Solutions",
      icon: <ShoppingCart className="w-6 h-6" />,
      items: [
        { name: "Complete Affiliate System", price: "From $399", description: "Full affiliate marketing system for your business" },
        { name: "Hosting Services", price: "From $19/mo", description: "Reliable web hosting with 99.9% uptime" }
      ]
    }
  ];

  const handleServiceAction = (service: any) => {
    if (service.action === 'partners') {
      window.open('/partners', '_blank');
    } else if (service.action === 'quote') {
      setSelectedService(service.name);
      document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setSelectedService(service.name);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-purple-500/10">
          <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive AI-powered solutions and business formation services to transform your business. 
            From chatbots to complete automation workflows and company formation across 8 countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="mr-4">
              Get Started Today
            </Button>
            <Link to="/countries">
              <Button variant="outline" size="lg">
                View Countries
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {services.map((category, index) => (
            <div key={index} className="mb-16">
              <div className="flex items-center mb-8">
                {category.icon}
                <h2 className="text-3xl font-bold ml-3">{category.category}</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((service, serviceIndex) => (
                  <Card key={serviceIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <Badge variant="secondary">{service.price}</Badge>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full" 
                        onClick={() => handleServiceAction(service)}
                      >
                        {service.actionText || 'Get Quote'}
                        {service.action === 'partners' && <ExternalLink className="w-4 h-4 ml-2" />}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="quote-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get a Custom <span className="gradient-text">Quote</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tell us about your project and we'll provide a tailored solution
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Request a Quote
              </CardTitle>
              {selectedService && (
                <Badge className="w-fit">Selected: {selectedService}</Badge>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com" 
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input 
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Your Company Inc." 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="service">Service Interested In</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Select a service...</option>
                    {services.map(category => 
                      category.items.map(service => (
                        <option key={service.name} value={service.name}>
                          {service.name} - {service.price}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="message">Project Details *</Label>
                  <Textarea 
                    id="message" 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your project requirements, timeline, and budget..."
                    rows={5}
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  Send Quote Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already using our AI-powered solutions and formation services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Schedule a Demo
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              Call Us Now
            </Button>
          </div>
        </div>
      </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
