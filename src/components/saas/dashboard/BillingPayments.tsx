import { useL } from '@/hooks/useL';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { startOrderPayment } from '@/lib/payOrder';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  CreditCard,
  Wallet,
} from 'lucide-react';

type OrderRow = {
  id: string;
  order_type: string;
  status: string | null;
  total_price: number;
  currency: string | null;
  created_at: string;
  metadata: any;
};

type TxRow = {
  order_id: string;
  status: string | null;
  amount: number;
  currency: string | null;
  payment_method: string | null;
  created_at: string;
  plan_id: string | null;
};

const BillingPayments = () => {
  const L = useL();
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ['billing-orders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('id, order_type, status, total_price, currency, created_at, metadata')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as OrderRow[];
    },
    enabled: !!user?.id,
  });

  const { data: deposits, isLoading: loadingDeposits } = useQuery({
    queryKey: ['billing-deposits', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_transactions')
        .select('order_id, status, amount, currency, payment_method, created_at, plan_id')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as TxRow[];
    },
    enabled: !!user?.id,
  });

  const [paying, setPaying] = useState<string | null>(null);
  const payNow = async (o: OrderRow) => {
    setPaying(o.id);
    try { await startOrderPayment(o, L('Your session expired. Please sign in again.', 'انتهت الجلسة. سجل الدخول مرة أخرى.')); }
    catch (e: any) { toast({ title: L('Could not start payment', 'تعذر بدء الدفع'), description: e?.message, variant: 'destructive' }); setPaying(null); }
  };

  const paidTotal = (orders || []).filter(o => ['paid', 'processing', 'completed'].includes(o.status || '')).reduce((s, o) => s + Number(o.total_price), 0)
    ;
  const pendingTotal = (orders || []).filter(o => o.status === 'pending').reduce((s, o) => s + Number(o.total_price), 0)
    ;

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            {L('Paid', 'مدفوع')}
          </Badge>
        );
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">{L('Processing', 'قيد المعالجة')}</Badge>;
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            <Clock className="mr-1 h-3 w-3" />
            {L('Unpaid', 'غير مدفوع')}
          </Badge>
        );
      case 'failed':
      case 'cancelled':
      case 'refunded':
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            <XCircle className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status || 'pending'}</Badge>;
    }
  };

  const orderLabel = (o: OrderRow) => {
    const name = o.metadata?.companyName;
    if (o.order_type === 'company_formation') return name ? `${L('Company formation','تأسيس شركة')} - ${name}` : L('Company formation','تأسيس شركة');
    return L('Service order','طلب خدمة');
  };

  const loading = loadingOrders;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{L('Billing & Payments', 'الفواتير والمدفوعات')}</h1>
        <p className="text-muted-foreground">{L('Your orders and payments', 'طلباتك ومدفوعاتك')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{L('Total paid', 'إجمالي المدفوع')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidTotal.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{L('Unpaid', 'غير مدفوع')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingTotal.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" />{L('Orders', 'الطلبات')}</CardTitle>
          <CardDescription>{L('Company formation and service orders', 'طلبات تأسيس الشركات')}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : !orders?.length ? (
            <p className="text-sm text-muted-foreground py-4">{L('No orders yet. Start a company formation to see it here.', 'لا توجد طلبات بعد. ابدأ تأسيس شركة لتظهر هنا.')}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{L('Description', 'الوصف')}</TableHead>
                  <TableHead>{L('Amount', 'المبلغ')}</TableHead>
                  <TableHead>{L('Status', 'الحالة')}</TableHead>
                  <TableHead>{L('Date', 'التاريخ')}</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{orderLabel(o)}</TableCell>
                    <TableCell>${Number(o.total_price).toFixed(2)} {o.currency || 'USD'}</TableCell>
                    <TableCell>{getStatusBadge(o.status)}</TableCell>
                    <TableCell>{new Date(o.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {o.status === 'pending' && o.order_type === 'company_formation' && (
                        <Button size="sm" disabled={paying === o.id} onClick={() => payNow(o)}>
                          {paying === o.id ? '...' : L('Pay now', 'ادفع الآن')}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingPayments;
