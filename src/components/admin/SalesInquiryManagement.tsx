import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mail, Phone, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SalesInquiry {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  jurisdiction: string | null;
  package: string | null;
  message: string;
  status: string;
  created_at: string;
}

const statusColor = (s: string) =>
  s === 'new' ? 'default' : s === 'resolved' ? 'secondary' : 'outline';

const SalesInquiryManagement = () => {
  const [items, setItems] = useState<SalesInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sales_inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast({ title: 'Failed to load', description: error.message, variant: 'destructive' });
    else setItems(data as SalesInquiry[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('sales_inquiries').update({ status }).eq('id', id);
    if (error) return toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    const { error } = await supabase.from('sales_inquiries').delete().eq('id', id);
    if (error) return toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    setItems((xs) => xs.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sales Inquiries</h1>
          <p className="text-sm text-muted-foreground">Messages submitted through the Contact Sales / Get in Touch form.</p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : items.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No inquiries yet.</CardContent></Card>
      ) : (
        <div className="grid gap-4">
          {items.map((it) => (
            <Card key={it.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <CardTitle className="text-base">
                    {it.first_name} {it.last_name ?? ''}
                    <Badge variant={statusColor(it.status) as never} className="ml-2 capitalize">{it.status}</Badge>
                  </CardTitle>
                  <span className="text-xs text-muted-foreground">{new Date(it.created_at).toLocaleString()}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href={`mailto:${it.email}`} className="inline-flex items-center hover:text-primary"><Mail className="w-4 h-4 mr-1.5" />{it.email}</a>
                  {it.phone && <a href={`tel:${it.phone}`} className="inline-flex items-center hover:text-primary"><Phone className="w-4 h-4 mr-1.5" />{it.phone}</a>}
                  {it.jurisdiction && <Badge variant="outline">{it.jurisdiction}</Badge>}
                  {it.package && <Badge variant="secondary">{it.package}</Badge>}
                </div>
                <p className="text-sm whitespace-pre-wrap bg-muted/40 rounded-md p-3">{it.message}</p>
                <div className="flex gap-2">
                  {it.status !== 'resolved' && (
                    <Button size="sm" variant="outline" onClick={() => setStatus(it.id, 'resolved')}>
                      <CheckCircle2 className="w-4 h-4 mr-1.5" /> Mark resolved
                    </Button>
                  )}
                  {it.status === 'new' && (
                    <Button size="sm" variant="ghost" onClick={() => setStatus(it.id, 'in_progress')}>Mark in progress</Button>
                  )}
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(it.id)}>
                    <Trash2 className="w-4 h-4 mr-1.5" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalesInquiryManagement;