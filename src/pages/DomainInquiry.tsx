import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send, Globe, MessageCircle, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const domainInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long').trim(),
  email: z.string().email('Invalid email address').max(255, 'Email too long').trim(),
  phone: z.string().max(20, 'Phone too long').optional().or(z.literal('')),
  domain_name: z.string().min(2, 'Domain name too short').max(253, 'Domain name too long').trim(),
  message: z.string().max(2000, 'Message must be under 2000 characters').optional().or(z.literal('')),
});

const DomainInquiry = () => {
  const { isRTL } = useTranslation();
  const L = (en: string, ar: string) => isRTL ? ar : en;
  const [searchParams] = useSearchParams();
  const domainFromUrl = searchParams.get('domain') || '';
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domain_name: domainFromUrl,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.domain_name) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const validatedData = domainInquirySchema.parse(formData);
      
      const { error } = await supabase
        .from('domain_inquiries')
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          domain_name: validatedData.domain_name,
          message: validatedData.message || null
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Inquiry submitted!",
        description: L("Your inquiry has been received.", "وصل استفسارك.")
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({ title: 'Invalid input', description: error.errors[0].message, variant: 'destructive' });
        setIsSubmitting(false);
        return;
      }
      console.error('Error submitting inquiry:', error);
      toast({ title: "Error", description: error.message || "Failed to submit inquiry.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background w-full max-w-full overflow-x-hidden">
        <Header />
        <main className="flex-1 pt-20 pb-24 md:pt-24 md:pb-12">
          <div className="w-full max-w-full px-3 sm:px-4 md:container md:mx-auto md:max-w-2xl">
            <Card className="text-center">
              <CardContent className="pt-12 pb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mb-4">{L('Thank You!', 'شكراً')}</h1>
                <p className="text-muted-foreground mb-6">
                  Your inquiry for <strong>{formData.domain_name}</strong> has been submitted successfully.
                  {L('We will reply to the email you provided.', 'هنرد على الإيميل اللي كتبته.')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/domains">
                      <Globe className="w-4 h-4 mr-2" />
                      {L('Browse More Domains', 'تصفح الدومينات')}
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://wa.me/201002905764" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {L('Contact via WhatsApp', 'تواصل عبر واتساب')}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background w-full max-w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 pt-20 pb-24 md:pt-24 md:pb-12">
        <div className="w-full max-w-full px-3 sm:px-4 md:container md:mx-auto">
          <Link
            to="/domains" 
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Domains
          </Link>

          <div className="grid lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    {L('Domain Inquiry', 'استفسار عن دومين')}
                  </CardTitle>
                  <CardDescription>
                    {L('Ask about this domain using the form below.', 'ابعت استفسارك عن الدومين من النموذج ده.')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{L('Full Name *', 'الاسم الكامل *')}</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{L('Email Address *', 'البريد الإلكتروني *')}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{L('Phone Number (Optional)', 'رقم الموبايل (اختياري)')}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="domain">{L('Domain Name *', 'اسم الدومين *')}</Label>
                        <Input
                          id="domain"
                          placeholder="example.com"
                          value={formData.domain_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, domain_name: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{L('Message (Optional)', 'رسالة (اختياري)')}</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project or any questions you have about this domain..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {L('Submit Inquiry', 'إرسال الاستفسار')}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{L('Quick Contact', 'تواصل سريع')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a 
                    href="https://wa.me/201002905764" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+20 100 290 5764</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:momo@foundstart.org"
                    className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">momo@foundstart.org</p>
                    </div>
                  </a>
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

export default DomainInquiry;
