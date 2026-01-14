import React, { useState } from 'react';
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

const DomainInquiry = () => {
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
      const { error } = await supabase
        .from('domain_inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          domain_name: formData.domain_name,
          message: formData.message || null
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Inquiry submitted!",
        description: "We'll get back to you within 24 hours."
      });
    } catch (error: any) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="text-center">
              <CardContent className="pt-12 pb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
                <p className="text-muted-foreground mb-6">
                  Your inquiry for <strong>{formData.domain_name}</strong> has been submitted successfully.
                  We'll get back to you within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/domains">
                      <Globe className="w-4 h-4 mr-2" />
                      Browse More Domains
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://wa.me/21002905764" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact via WhatsApp
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link 
            to="/domains" 
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Domains
          </Link>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Domain Inquiry
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below to inquire about a domain. We'll respond within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
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
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="domain">Domain Name *</Label>
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
                      <Label htmlFor="message">Message (Optional)</Label>
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
                          Submit Inquiry
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
                  <CardTitle className="text-lg">Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a 
                    href="https://wa.me/21002905764" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+210 029 05764</p>
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why Buy From Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Secure domain transfer process</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>24/7 support during transfer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Flexible payment options</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                    <span>Money-back guarantee</span>
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

export default DomainInquiry;
