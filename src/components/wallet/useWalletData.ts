import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';

export interface WalletTx {
  id: string;
  amount: number;
  status: string;
  method: string;
  date: string;
}

// Real wallet data: wallet deposits recorded in payment_transactions (RLS limits rows to the signed-in user).
export const useWalletData = () => {
  const { user } = useAuth();
  const [txs, setTxs] = useState<WalletTx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setTxs([]); setLoading(false); return; }
    let alive = true;
    (supabase as any)
      .from('payment_transactions')
      .select('id, amount, status, payment_method, created_at')
      .eq('plan_id', 'wallet-deposit')
      .order('created_at', { ascending: false })
      .then(({ data }: any) => {
        if (!alive) return;
        setTxs((data ?? []).map((r: any) => ({
          id: r.id, amount: Number(r.amount) || 0, status: String(r.status ?? 'pending').toLowerCase(),
          method: r.payment_method || 'Card', date: r.created_at,
        })));
        setLoading(false);
      });
    return () => { alive = false; };
  }, [user?.id]);

  const done = ['completed', 'paid', 'success', 'succeeded'];
  const balance = txs.filter(t => done.includes(t.status)).reduce((s, t) => s + t.amount, 0);
  const pending = txs.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0);
  return { txs, loading, balance, pending };
};
