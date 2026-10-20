import React from 'react';
import { useL } from '@/hooks/useL';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Plus, Eye, FileText, MoreVertical, Loader2 } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

const MyCompanies = () => {
  const L = useL();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const orderSuccess = searchParams.get('order') === 'success';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paying, setPaying] = React.useState<string | null>(null);
  const { data: unpaid = [] } = useQuery({
    queryKey: ['unpaid-orders', user?.id],
    queryFn: async () => {
      const { data } = await supabase.from('orders').select('id, total_price, created_at, metadata').eq('user_id', user!.id).eq('order_type', 'company_formation').eq('status', 'pending').order('created_at', { ascending: false }).limit(3);
      return (data || []) as any[];
    },
    enabled: !!user?.id,
  });
  const payNow = async (o: any) => {
    setPaying(o.id);
    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess.session?.access_token;
      if (!token) throw new Error(L('Your session expired. Please sign in again.', 'انتهت الجلسة. سجل الدخول مرة أخرى.'));
      const m = o.metadata || {};
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-formation-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: JSON.stringify({ country: m.country, entityType: m.entityType, companyName: m.companyName, businessAddress: m.businessAddress, businessDescription: m.businessDescription, owners: m.owners || [], addons: [] }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d?.paymentUrl) throw new Error(d?.error || `HTTP ${res.status}`);
      window.location.href = d.paymentUrl;
    } catch (e: any) {
      toast({ title: L('Could not start payment', 'تعذر بدء الدفع'), description: e?.message, variant: 'destructive' });
      setPaying(null);
    }
  };

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['my-companies', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      const { data: po } = await supabase.from('orders').select('company_id').eq('user_id', user.id).in('status', ['paid','processing','completed']);
      const paid = new Set((po || []).map((o: any) => o.company_id));
      return (data || []).filter((c: any) => paid.has(c.id) || (c.formation_status && c.formation_status !== 'draft'));
    },
    enabled: !!user?.id,
  });

  const effStatus = (c: any) => (c.formation_status && c.formation_status !== 'draft' ? c.formation_status : (c.status && c.status !== 'draft' ? c.status : 'submitted'));
  const getStatusBadge = (status: string | null) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      draft: { variant: 'outline', label: L('Draft','مسودة') },
      submitted: { variant: 'secondary', label: L('Submitted','تم الإرسال') },
      in_progress: { variant: 'default', label: L('In Progress','قيد التنفيذ') },
      pending_documents: { variant: 'secondary', label: L('Pending Documents','بانتظار المستندات') },
      completed: { variant: 'default', label: L('Completed','مكتملة') },
      rejected: { variant: 'destructive', label: L('Rejected','مرفوضة') },
    };
    const config = statusConfig[status || 'draft'] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getCountryFlag = (countryCode: string | null) => {
    const flags: Record<string, string> = {
      usa: '🇺🇸',
      uk: '🇬🇧',
      germany: '🇩🇪',
      netherlands: '🇳🇱',
      spain: '🇪🇸',
      france: '🇫🇷',
    };
    return flags[countryCode || ''] || '';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-destructive">{L('Error loading companies. Please try again.','تعذر تحميل الشركات. حاول مرة أخرى.')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {orderSuccess && (
        <div className="rounded-lg border border-green-300 bg-green-50 dark:border-green-900 dark:bg-green-950 p-4 text-sm">
          {L('Payment received. Your company formation order is confirmed and its status will update here as we work on it.', 'تم استلام الدفع. تم تأكيد طلب تأسيس شركتك وستتحدث حالته هنا أثناء العمل عليه.')}
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{L('My Companies', 'شركاتي')}</h1>
          <p className="text-muted-foreground">{L('Manage your registered companies and formations', 'إدارة شركاتك المسجلة وطلبات التأسيس')}</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/formation">
            <Plus className="w-4 h-4 mr-2" />
            {L('New Company', 'شركة جديدة')}
          </Link>
        </Button>
      </div>

      {unpaid.length > 0 && (
        <Card className="border-amber-500/40">
          <CardHeader className="pb-2"><CardTitle className="text-base">{L('Complete your payment', 'أكمل الدفع')}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {unpaid.map((o) => (
              <div key={o.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-medium">{o.metadata?.companyName || L('Company formation', 'تأسيس شركة')}</div>
                  <div className="text-sm text-muted-foreground">${Number(o.total_price)} · {L('Not paid yet', 'لم يتم الدفع بعد')}</div>
                </div>
                <Button onClick={() => payNow(o)} disabled={paying === o.id}>
                  {paying === o.id ? L('Opening checkout...', 'جارٍ فتح الدفع...') : L('Pay now', 'ادفع الآن')}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {companies && companies.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{L('Company', 'الشركة')}</TableHead>
                    <TableHead>{L('Jurisdiction', 'الدولة')}</TableHead>
                    <TableHead>{L('Entity Type', 'نوع الكيان')}</TableHead>
                    <TableHead>{L('Status', 'الحالة')}</TableHead>
                    <TableHead>{L('Created', 'تاريخ الإنشاء')}</TableHead>
                    <TableHead className="text-right">{L('Actions', 'الإجراءات')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{company.company_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{getCountryFlag(company.country_code)}</span>
                          <span className="capitalize">{company.jurisdiction}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="uppercase text-sm">{company.entity_type || company.company_type || '-'}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(effStatus(company))}</TableCell>
                      <TableCell>
                        {company.created_at ? format(new Date(company.created_at), 'MMM d, yyyy') : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate('/dashboard/documents')}>
                              <FileText className="w-4 h-4 mr-2" />
                              {L('Documents', 'المستندات')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{L('No Companies Yet', 'لا توجد شركات بعد')}</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              {L('Start your business journey by forming your first company in USA, UK, or Europe.', 'ابدأ رحلتك بتأسيس شركتك الأولى في أمريكا أو بريطانيا أو أوروبا أو مصر.')}
            </p>
            <Button asChild>
              <Link to="/dashboard/formation">
                <Plus className="w-4 h-4 mr-2" />
                {L('Start Company Formation', 'ابدأ تأسيس شركة')}
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      {companies && companies.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{companies.length}</div>
              <p className="text-sm text-muted-foreground">{L('Total Companies', 'إجمالي الشركات')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {companies.filter(c => effStatus(c) === 'completed').length}
              </div>
              <p className="text-sm text-muted-foreground">{L('Active', 'نشطة')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {companies.filter(c => effStatus(c) === 'in_progress').length}
              </div>
              <p className="text-sm text-muted-foreground">{L('In Progress', 'قيد التنفيذ')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {companies.filter(c => effStatus(c) === 'submitted').length}
              </div>
              <p className="text-sm text-muted-foreground">{L('Submitted', 'تم الإرسال')}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MyCompanies;
