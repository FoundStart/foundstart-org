import React from 'react';
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
  const { user } = useAuth();

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

  const paidTotal = (orders || []).filter(o => ['paid', 'processing', 'completed'].includes(o.status || '')).reduce((s, o) => s + Number(o.total_price), 0)
    + (deposits || []).filter(d => d.status === 'completed').reduce((s, d) => s + Number(d.amount), 0);
  const pendingTotal = (orders || []).filter(o => o.status === 'pending').reduce((s, o) => s + Number(o.total_price), 0)
    + (deposits || []).filter(d => d.status === 'pending').reduce((s, d) => s + Number(d.amount), 0);

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Paid
          </Badge>
        );
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Processing</Badge>;
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            <Clock className="mr-1 h-3 w-3" />
            Pending
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
    if (o.order_type === 'company_formation') return name ? `Company formation - ${name}` : 'Company formation';
    return 'Service order';
  };

  const loading = loadingOrders || loadingDeposits;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Billing & Payments</h1>
        <p className="text-muted-foreground">Your orders, payments and wallet deposits</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidTotal.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingTotal.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" />Orders</CardTitle>
          <CardDescription>Company formation and service orders</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : !orders?.length ? (
            <p className="text-sm text-muted-foreground py-4">No orders yet. Start a company formation to see it here.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{orderLabel(o)}</TableCell>
                    <TableCell>${Number(o.total_price).toFixed(2)} {o.currency || 'USD'}</TableCell>
                    <TableCell>{getStatusBadge(o.status)}</TableCell>
                    <TableCell>{new Date(o.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Wallet className="h-5 w-5" />Wallet deposits</CardTitle>
          <CardDescription>Card deposits to your FoundStart wallet</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : !deposits?.length ? (
            <p className="text-sm text-muted-foreground py-4">No deposits yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deposits.map((d) => (
                  <TableRow key={d.order_id}>
                    <TableCell className="font-medium">{d.order_id}</TableCell>
                    <TableCell className="capitalize">{d.payment_method || '-'}</TableCell>
                    <TableCell>${Number(d.amount).toFixed(2)} {d.currency || 'USD'}</TableCell>
                    <TableCell>{getStatusBadge(d.status)}</TableCell>
                    <TableCell>{new Date(d.created_at).toLocaleDateString()}</TableCell>
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
