import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Globe, MessageCircle, Mail, CheckCircle2, X, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useDomainFavorites } from '@/hooks/useDomainFavorites';

const BulkDomainInquiry = () => {
  const [searchParams] = useSearchParams();
  const domainsFromUrl = searchParams.get('domains')?.split(',') || [];
  const { toast } = useToast();
  const { favorites, toggleFavorite } = useDomainFavorites();
  
  const [selectedDomains, setSelectedDomains] = useState<string[]>(domainsFromUrl);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const removeDomain = (domain: string) => {
    setSelectedDomains(prev => prev.filter(d => d !== domain));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || selectedDomains.length === 0) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields and select at least one domain.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Insert all domain inquiries
      const inquiries = selectedDomains.map(domain => ({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        domain_name: domain,
        message: formData.message || `Bulk inquiry for ${selectedDomains.length} domains`
      }));

      const { error } = await supabase
        .from('domain_inquiries')
        .insert(inquiries);

      if (error) throw error;

      // Send email notification
      try {
        await supabase.functions.invoke('send-inquiry-notification', {
          body: {
            inquiryType: 'bulk',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            domains: selectedDomains,
            message: formData.message
          }
        });
      } catch (emailError) {
        console.log('Email notification not sent:', emailError);
      }

      setIsSubmitted(true);
      toast({
        title: "Bulk inquiry submitted!",
        description: `We'll get back to you about ${selectedDomains.length} domains within 24 hours.`
      });
    } catch (error: any) {
      console.error('Error submitting bulk inquiry:', error);
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
      <MobileLayout title="Inquiry Submitted" showBack>
        <div className="p-4">
          <Card className="text-center">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
              <p className="text-muted-foreground mb-6">
                Your bulk inquiry for <strong>{selectedDomains.length} domains</strong> has been submitted.
                We'll get back to you within 24 hours.
              </p>
              <div className="flex flex-col gap-4">
                <Button asChild size="lg">
                  <Link to="/domains">
                    <Globe className="w-4 h-4 mr-2" />
                    Browse More Domains
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://wa.me/21002905764" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact via WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Bulk Inquiry" showBack>
      <div className="p-4 space-y-6">
        {/* Selected Domains */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Selected Domains ({selectedDomains.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDomains.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <p>No domains selected</p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/domain-wishlist">Select from wishlist</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedDomains.map(domain => (
                  <Badge key={domain} variant="secondary" className="pl-3 pr-1 py-1.5 text-sm">
                    {domain}
                    <button 
                      onClick={() => removeDomain(domain)}
                      className="ml-2 p-0.5 hover:bg-muted rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
            <CardDescription>Fill out your details to inquire about these domains</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="h-12"
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
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project or any questions..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-base" 
                disabled={isSubmitting || selectedDomains.length === 0}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Inquiry for {selectedDomains.length} Domain{selectedDomains.length !== 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Contact */}
        <div className="grid grid-cols-2 gap-4">
          <a 
            href="https://wa.me/21002905764" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-green-500/10 hover:bg-green-500/20 transition-colors touch-manipulation"
          >
            <MessageCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium text-green-600">WhatsApp</span>
          </a>
          <a 
            href="mailto:momo@foundstart.org"
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors touch-manipulation"
          >
            <Mail className="w-5 h-5 text-primary" />
            <span className="font-medium text-primary">Email</span>
          </a>
        </div>
      </div>
    </MobileLayout>
  );
};

export default BulkDomainInquiry;
