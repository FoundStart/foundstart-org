import React from 'react';
import { useL } from '@/hooks/useL';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import {
  Building2, ShoppingCart, FileText, CreditCard, ArrowRight, CheckCircle2,
  Clock, AlertCircle, Plus, Bot, Loader2, Globe, TrendingUp, Wallet,
  BarChart3, Calendar, Bell, Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const DashboardHome = () => {
  const L = useL();
  const { user } = useAuth();

  const { data: companies = [], isLoading: companiesLoading } = useQuery({
    queryKey: ['user-companies', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase.from('companies').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: documents = [] } = useQuery({
    queryKey: ['user-documents', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase.from('documents').select('*').eq('user_id', user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: services = [] } = useQuery({
    queryKey: ['user-services', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase.from('services').select('*').eq('user_id', user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: tickets = [] } = useQuery({
    queryKey: ['user-tickets', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase.from('support_tickets').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const pendingPayments = orders.filter(o => o.status === 'pending').reduce((sum, o) => sum + (o.total_price || 0), 0);
  const activeServices = services.filter(s => s.status === 'active').length;
  const completedCompanies = companies.filter(c => c.formation_status === 'completed').length;
  const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;

  const stats = [
    { title: L('Companies','الشركات'), value: companies.length.toString(), subtitle: `${completedCompanies} ${L('completed','مكتملة')}`, icon: Building2, color: 'from-blue-500 to-indigo-600' },
    { title: L('Orders','الطلبات'), value: orders.length.toString(), subtitle: `${orders.filter(o => ['paid','processing','completed'].includes(o.status || '')).length} ${L('paid','مدفوع')}`, icon: ShoppingCart, color: 'from-emerald-500 to-green-600' },
    { title: L('Documents','المستندات'), value: documents.length.toString(), subtitle: L('Your files','ملفاتك'), icon: FileText, color: 'from-violet-500 to-purple-600' },
    { title: L('Pending','قيد الدفع'), value: `$${pendingPayments}`, subtitle: `${orders.filter(o => o.status === 'pending').length} ${L('orders','طلبات')}`, icon: CreditCard, color: 'from-amber-500 to-orange-600' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'in_progress': case 'processing': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending': case 'submitted': case 'draft': return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default: return null;
    }
  };

  const getCompanyProgress = (status: string | null) => {
    const map: Record<string, number> = { draft: 20, submitted: 40, in_progress: 60, pending_documents: 80, completed: 100, rejected: 0 };
    return map[status || 'draft'] || 0;
  };

  const quickActions = [
    { icon: Building2, label: L('Form a Company','أسس شركة'), link: '/dashboard/formation', gradient: 'from-blue-500 to-indigo-600' },
    { icon: Building2, label: L('My Companies','شركاتي'), link: '/dashboard/companies', gradient: 'from-emerald-500 to-green-600' },
    { icon: ArrowRight, label: L('Affiliate','الأفلييت'), link: '/dashboard/affiliates', gradient: 'from-amber-500 to-orange-600' },
    { icon: ArrowRight, label: L('Get Support','الدعم'), link: '/dashboard/support', gradient: 'from-rose-500 to-pink-600' },
  ];

  const statusLabel = (st: string | null) => {
    const m: Record<string, [string, string]> = { draft: ['Draft','مسودة'], submitted: ['Submitted','تم الإرسال'], in_progress: ['In progress','قيد التنفيذ'], pending_documents: ['Pending documents','بانتظار المستندات'], completed: ['Completed','مكتملة'], rejected: ['Rejected','مرفوضة'], pending: ['Unpaid','غير مدفوع'], paid: ['Paid','مدفوع'], processing: ['Processing','قيد المعالجة'] };
    const x = m[st || 'draft']; return x ? L(x[0], x[1]) : (st || '');
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return L('Good morning','صباح الخير');
    if (hour < 18) return L('Good afternoon','مساء الخير');
    return L('Good evening','مساء الخير');
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-purple-500/10 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">{greeting()}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
              {L('Welcome','أهلاً')}{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : L(' back',' بعودتك')}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {L('Here\'s your business overview for today', 'نظرة عامة على أعمالك اليوم')}
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/dashboard/formation">
                <Plus className="mr-2 h-4 w-4" />
                {L('New Company', 'شركة جديدة')}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/dashboard/affiliates">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {L('Affiliate', 'الأفلييت')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden relative group">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.subtitle}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            to={action.link}
            className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium text-center">{action.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Company Formation Progress */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {L('Company Formation', 'تأسيس الشركات')}
                </CardTitle>
                <CardDescription>{L('Track your company formations', 'تابع تأسيس شركاتك')}</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/companies">{L('View All', 'عرض الكل')}</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {companiesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : companies.length > 0 ? (
              companies.slice(0, 3).map((company) => (
                <div key={company.id} className="p-3 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{company.company_name}</p>
                      <p className="text-xs text-muted-foreground">{company.jurisdiction}</p>
                    </div>
                    <Badge variant={company.formation_status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                      {statusLabel(company.formation_status)}
                    </Badge>
                  </div>
                  <Progress value={getCompanyProgress(company.formation_status)} className="h-1.5" />
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Building2 className="h-8 w-8 text-primary/50" />
                </div>
                <p className="text-muted-foreground text-sm">{L('No companies yet', 'لا توجد شركات بعد')}</p>
                <Button asChild variant="outline" size="sm" className="mt-3">
                  <Link to="/dashboard/formation">{L('Start Your First Company', 'أسس شركتك الأولى')}</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  {L('Recent Orders', 'آخر الطلبات')}
                </CardTitle>
                <CardDescription>{L('Your latest orders and updates', 'أحدث طلباتك وتحديثاتها')}</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/billing">{L('View All', 'عرض الكل')}</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    {getStatusIcon(order.status || 'pending')}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{order.order_type === 'company_formation' ? L('Company formation','تأسيس شركة') : order.order_type}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">${order.total_price}</p>
                      <Badge variant="outline" className="text-xs">{statusLabel(order.status)}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <ShoppingCart className="h-8 w-8 text-primary/50" />
                  </div>
                  <p className="text-sm text-muted-foreground">{L('No orders yet', 'لا توجد طلبات بعد')}</p>
                  <Button asChild variant="outline" size="sm" className="mt-3">
                    <Link to="/dashboard/formation">{L('Form a Company', 'أسس شركة')}</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Tickets */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                {L('Support Tickets', 'تذاكر الدعم')}
                {openTickets > 0 && (
                  <Badge className="ml-2">{openTickets} open</Badge>
                )}
              </CardTitle>
              <CardDescription>{L('Your recent support requests', 'آخر طلبات الدعم')}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/support">{L('View All', 'عرض الكل')}</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {tickets.length > 0 ? (
            <div className="space-y-2">
              {tickets.slice(0, 3).map((ticket) => (
                <div key={ticket.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  {getStatusIcon(ticket.status || 'open')}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(ticket.created_at || '').toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">{ticket.status?.replace('_', ' ')}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">{L('No support tickets', 'لا توجد تذاكر دعم')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
