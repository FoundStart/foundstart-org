import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';

type P = { id: string; user_id: string; provider: string | null; amount: number; currency: string | null; status: string; created_at: string };

const PaymentsAdmin = () => {
  const [rows, setRows] = useState<P[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('payments').select('id,user_id,provider,amount,currency,status,created_at').order('created_at', { ascending: false }).limit(200)
      .then(({ data }) => { setRows((data || []) as P[]); setLoading(false); });
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Payments</h1>
      {loading ? <p className="text-muted-foreground">Loading...</p> : rows.length === 0 ? (
        <Card><CardContent className="py-10 text-center text-muted-foreground">No payments recorded yet.</CardContent></Card>
      ) : (
        <div className="overflow-x-auto"><table className="w-full text-sm">
          <thead><tr className="text-left text-muted-foreground"><th className="p-2">Date</th><th className="p-2">Amount</th><th className="p-2">Status</th><th className="p-2">Provider</th></tr></thead>
          <tbody>{rows.map(r => (
            <tr key={r.id} className="border-t"><td className="p-2">{new Date(r.created_at).toLocaleDateString('en-US')}</td><td className="p-2">{(r.currency || 'USD').toUpperCase()} {Number(r.amount).toFixed(2)}</td><td className="p-2">{r.status}</td><td className="p-2">{r.provider || '-'}</td></tr>
          ))}</tbody></table></div>
      )}
    </div>
  );
};
export default PaymentsAdmin;
