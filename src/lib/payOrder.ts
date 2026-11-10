import { supabase } from '@/integrations/supabase/client';

// Re-opens Stripe checkout for an unpaid formation order (same country, entity, name, price).
export async function startOrderPayment(order: { metadata?: any }, expiredMsg: string): Promise<void> {
  const { data: sess } = await supabase.auth.getSession();
  const token = sess.session?.access_token;
  if (!token) throw new Error(expiredMsg);
  const m = order.metadata || {};
  const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-formation-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
    body: JSON.stringify({ country: m.country, entityType: m.entityType, companyName: m.companyName, businessAddress: m.businessAddress, businessDescription: m.businessDescription, owners: m.owners || [], addons: [] }),
  });
  const d = await res.json().catch(() => ({}));
  if (!res.ok || !d?.paymentUrl) throw new Error(d?.error || `HTTP ${res.status}`);
  window.location.href = d.paymentUrl;
}
