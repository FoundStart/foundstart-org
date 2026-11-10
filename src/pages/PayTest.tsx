import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Hidden $1 Stripe test page. Not linked anywhere, noindex, not in the sitemap.
const PayTest = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let m = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!m) { m = document.createElement('meta'); m.name = 'robots'; document.head.appendChild(m); }
    m.content = 'noindex, nofollow';
  }, []);

  const pay = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('stripe-create-payment', {
        body: { amount: 1, currency: 'USD', customer: { name: user.email, email: user.email, phone: '' }, planId: 'webhook-test-1usd' },
      });
      if (error) throw error;
      if (data?.success && data?.paymentUrl) { window.location.href = data.paymentUrl; return; }
      throw new Error(data?.error || 'Could not start checkout');
    } catch (e: any) {
      toast({ title: 'Payment error', description: e?.message || 'Could not start checkout', variant: 'destructive' });
      setLoading(false);
    }
  };

  return <div className="p-8">Stripe payments are disabled on FoundStart. / تم إيقاف الدفع عبر Stripe على FoundStart.</div>;
};
export default PayTest;
