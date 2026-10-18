import { waLink } from '@/lib/whatsapp';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/contexts/TranslationContext';
import PageHero from '@/components/PageHero';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { toast } = useToast();

  const { isRTL } = useTranslation();
  const [sending, setSending] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const parts = formData.name.trim().split(/\s+/);
    const { error } = await supabase.from('sales_inquiries').insert({
      first_name: (parts[0] || formData.name).slice(0, 100),
      last_name: parts.slice(1).join(' ').slice(0, 100) || null,
      email: formData.email.trim(),
      message: (formData.subject ? formData.subject + ': ' : '') + formData.message,
      package: 'contact-page'
    });
    setSending(false);
    if (error) {
      toast({ title: isRTL ? 'تعذر إرسال الرسالة' : 'Could not send your message', description: isRTL ? 'حاول مرة أخرى أو راسلنا على واتساب.' : 'Please try again or message us on WhatsApp.', variant: 'destructive' });
      return;
    }
    toast({ title: isRTL ? 'تم إرسال رسالتك' : 'Message sent', description: isRTL ? 'شكرًا لتواصلك. سنرد عليك قريبًا.' : "Thank you for contacting us. We'll reply soon." });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <PageHero
          title="Contact"
          highlight="Us"
          subtitle="Have questions about our services? Need help with your business formation? We're here to help!"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Send className="w-6 h-6 text-primary" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="What is this regarding?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us how we can help you..." rows={6} />
                  </div>
                  <Button type="submit" disabled={sending} className="w-full"><Send className="w-4 h-4 mr-2" />Send Message</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card>
                <CardHeader><CardTitle className="text-2xl">Get in Touch</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MessageCircle className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">WhatsApp</h3>
                      <a href={waLink(isRTL)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{isRTL ? 'تواصل معنا على واتساب' : 'Chat with us on WhatsApp'}</a>
                      <p className="text-muted-foreground mt-1" dir="ltr">+20 100 290 5764</p>
                    </div>
                  </div>
                  
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Service Areas</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['🇺🇸 USA', '🇬🇧 UK', '🇨🇦 Canada', '🇪🇪 Estonia', '🇫🇮 Finland', '🇸🇪 Sweden', '🇱🇻 Latvia', '🇱🇹 Lithuania', '🇮🇪 Ireland', '🇪🇬 Egypt'].map((country) => (
                      <Badge key={country} variant="secondary">{country}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactUs;