
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const SALES_EMAIL = 'momo@foundstart.org';

const ContactSales = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    jurisdiction: 'United States', pkg: 'Enterprise Package', message: '',
  });

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: 'Missing fields', description: 'First name, email and message are required.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('sales_inquiries').insert({
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim() || null,
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      jurisdiction: form.jurisdiction,
      package: form.pkg,
      message: form.message.trim(),
    });
    setSubmitting(false);
    if (error) {
      toast({ title: 'Could not send message', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Message sent!', description: 'Our sales team will reach out shortly.' });
    setForm({ firstName: '', lastName: '', email: '', phone: '', jurisdiction: 'United States', pkg: 'Enterprise Package', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-3xl md:text-4xl font-bold">
                Contact Our <span className="gradient-text">Sales Team</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to start your business? Our experts are here to help you choose 
                the perfect package and answer all your questions.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent>
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                </div>
                
                <div>
                  <Label htmlFor="jurisdiction">Interested Jurisdiction</Label>
                  <select id="jurisdiction" className="w-full p-2 border rounded-md bg-background" value={form.jurisdiction} onChange={(e) => update('jurisdiction', e.target.value)}>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Multiple Jurisdictions</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="package">Package Interest</Label>
                  <select id="package" className="w-full p-2 border rounded-md bg-background" value={form.pkg} onChange={(e) => update('pkg', e.target.value)}>
                    <option>Enterprise Package</option>
                    <option>Professional Package</option>
                    <option>Starter Package</option>
                    <option>Custom Solution</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your business needs..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</>) : 'Send Message'}
                </Button>
              </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get detailed information about our Enterprise packages
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Schedule a Call
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Book a 30-minute consultation with our business formation experts
                  </p>
                  <Button variant="outline" className="w-full">
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Enterprise Benefits</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Custom pricing for bulk formations</li>
                    <li>• Dedicated account manager</li>
                    <li>• Priority support & faster processing</li>
                    <li>• Advanced compliance management</li>
                    <li>• Multi-jurisdiction expertise</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactSales;
