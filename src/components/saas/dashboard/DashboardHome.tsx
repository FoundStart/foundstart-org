import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShoppingCart,
  FileText,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Bot,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const DashboardHome = () => {
  const { user } = useAuth();

  // Fetch user's companies
  const { data: companies = [], isLoading: companiesLoading } = useQuery({
    queryKey: ['user-companies', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Fetch user's documents
  const { data: documents = [] } = useQuery({
    queryKey: ['user-documents', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Fetch user's orders
  const { data: orders = [] } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Fetch user's services
  const { data: services = [] } = useQuery({
    queryKey: ['user-services', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const pendingPayments = orders
    .filter(o => o.status === 'pending')
    .reduce((sum, o) => sum + (o.total_price || 0), 0);

  const stats = [
    { title: 'Companies', value: companies.length.toString(), icon: Building2, color: 'text-primary' },
    { title: 'Active Services', value: services.filter(s => s.status === 'active').length.toString(), icon: ShoppingCart, color: 'text-green-500' },
    { title: 'Documents', value: documents.length.toString(), icon: FileText, color: 'text-blue-500' },
    { title: 'Pending Payments', value: `$${pendingPayments}`, icon: CreditCard, color: 'text-orange-500' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in_progress':
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
      case 'submitted':
      case 'draft':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getCompanyProgress = (status: string | null) => {
    const progressMap: Record<string, number> = {
      draft: 20,
      submitted: 40,
      in_progress: 60,
      pending_documents: 80,
      completed: 100,
      rejected: 0,
    };
    return progressMap[status || 'draft'] || 0;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
            Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your business activities
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/formation">
            <Plus className="mr-2 h-4 w-4" />
            Start New Company
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Company Formation Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Formation Progress
            </CardTitle>
            <CardDescription>Track your company formations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {companiesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : companies.length > 0 ? (
              companies.slice(0, 3).map((company) => (
                <div key={company.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{company.company_name}</p>
                      <p className="text-sm text-muted-foreground">{company.jurisdiction}</p>
                    </div>
                    <Badge variant={company.formation_status === 'completed' ? 'default' : 'secondary'}>
                      {company.formation_status?.replace('_', ' ') || 'Draft'}
                    </Badge>
                  </div>
                  <Progress value={getCompanyProgress(company.formation_status)} className="h-2" />
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-muted-foreground">No companies yet</p>
                <Button asChild variant="outline" className="mt-4">
                  <Link to="/dashboard/formation">Start Your First Company</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest orders and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.slice(0, 4).map((order) => (
                  <div key={order.id} className="flex items-start gap-3">
                    {getStatusIcon(order.status || 'pending')}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{order.order_type}</p>
                      <p className="text-sm text-muted-foreground">${order.total_price}</p>
                    </div>
                    <Badge variant="outline">{order.status}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No orders yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" asChild className="h-auto flex-col gap-2 py-4">
              <Link to="/dashboard/formation">
                <Building2 className="h-6 w-6" />
                <span>Form a Company</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto flex-col gap-2 py-4">
              <Link to="/dashboard/services">
                <ShoppingCart className="h-6 w-6" />
                <span>Browse Services</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto flex-col gap-2 py-4">
              <Link to="/dashboard/ai-assistant">
                <Bot className="h-6 w-6" />
                <span>AI Assistant</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto flex-col gap-2 py-4">
              <Link to="/dashboard/support">
                <ArrowRight className="h-6 w-6" />
                <span>Get Support</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
