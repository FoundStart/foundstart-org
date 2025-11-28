import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp,
  Activity,
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Stats {
  totalUsers: number;
  totalCompanies: number;
  totalServices: number;
  activeServices: number;
  pendingServices: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

interface RecentActivity {
  id: string;
  type: 'user_signup' | 'service_purchase' | 'service_activated' | 'company_created';
  user_email: string;
  service_name?: string;
  company_name?: string;
  timestamp: string;
  amount?: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalCompanies: 0,
    totalServices: 0,
    activeServices: 0,
    pendingServices: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentActivity();
    
    const channel = supabase
      .channel('admin-updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'services' },
        () => {
          fetchStats();
          fetchRecentActivity();
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'profiles' },
        () => {
          fetchStats();
          fetchRecentActivity();
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'companies' },
        () => {
          fetchStats();
          fetchRecentActivity();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStats = async () => {
    try {
      // Get total users
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get total companies
      const { count: companiesCount } = await supabase
        .from('companies')
        .select('*', { count: 'exact', head: true });

      // Get services stats
      const { data: services } = await supabase
        .from('services')
        .select('price, status');

      const totalServices = services?.length || 0;
      const activeServices = services?.filter(s => s.status === 'active').length || 0;
      const pendingServices = services?.filter(s => s.status === 'pending').length || 0;
      
      // Calculate revenue
      const totalRevenue = services?.reduce((sum, s) => sum + Number(s.price), 0) || 0;
      
      // Calculate monthly revenue (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: monthlyServices } = await supabase
        .from('services')
        .select('price')
        .gte('purchased_at', thirtyDaysAgo.toISOString());
      
      const monthlyRevenue = monthlyServices?.reduce((sum, s) => sum + Number(s.price), 0) || 0;

      setStats({
        totalUsers: usersCount || 0,
        totalCompanies: companiesCount || 0,
        totalServices,
        activeServices,
        pendingServices,
        totalRevenue,
        monthlyRevenue,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const activities: RecentActivity[] = [];

      // Get recent service purchases with user info via separate query
      const { data: recentServices } = await supabase
        .from('services')
        .select('id, service_name, price, status, purchased_at, user_id')
        .order('purchased_at', { ascending: false })
        .limit(10);

      // Get recent user signups
      const { data: recentUsers } = await supabase
        .from('profiles')
        .select('user_id, email, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      // Get recent companies
      const { data: recentCompanies } = await supabase
        .from('companies')
        .select('id, company_name, user_id, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      // Build a map of user_ids to emails from profiles
      const userIds = new Set<string>();
      recentServices?.forEach(s => userIds.add(s.user_id));
      recentCompanies?.forEach(c => userIds.add(c.user_id));

      const { data: userProfiles } = await supabase
        .from('profiles')
        .select('user_id, email')
        .in('user_id', Array.from(userIds));

      const emailMap = new Map(userProfiles?.map(p => [p.user_id, p.email]) || []);

      // Add user signups
      recentUsers?.forEach(user => {
        activities.push({
          id: `signup-${user.user_id}`,
          type: 'user_signup',
          user_email: user.email || 'Unknown',
          timestamp: user.created_at || new Date().toISOString(),
        });
      });

      // Add service purchases
      recentServices?.forEach(service => {
        activities.push({
          id: `service-${service.id}`,
          type: service.status === 'active' ? 'service_activated' : 'service_purchase',
          user_email: emailMap.get(service.user_id) || 'Unknown',
          service_name: service.service_name,
          timestamp: service.purchased_at || new Date().toISOString(),
          amount: Number(service.price),
        });
      });

      // Add company creations
      recentCompanies?.forEach(company => {
        activities.push({
          id: `company-${company.id}`,
          type: 'company_created',
          user_email: emailMap.get(company.user_id) || 'Unknown',
          company_name: company.company_name,
          timestamp: company.created_at || new Date().toISOString(),
        });
      });

      // Sort by timestamp
      activities.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setRecentActivity(activities.slice(0, 10));
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'user_signup':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'service_purchase':
        return <ShoppingCart className="w-4 h-4 text-purple-500" />;
      case 'service_activated':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'company_created':
        return <Building2 className="w-4 h-4 text-orange-500" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityText = (activity: RecentActivity) => {
    switch (activity.type) {
      case 'user_signup':
        return `${activity.user_email} signed up`;
      case 'service_purchase':
        return `${activity.user_email} purchased ${activity.service_name}`;
      case 'service_activated':
        return `${activity.service_name} activated for ${activity.user_email}`;
      case 'company_created':
        return `${activity.user_email} created ${activity.company_name}`;
      default:
        return 'Unknown activity';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Platform overview and activity</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground hidden sm:block" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground hidden sm:block" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.totalCompanies}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Formed companies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground hidden sm:block" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              All-time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Monthly</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground hidden sm:block" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Status Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Services</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.totalServices}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeServices} active, {stats.pendingServices} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Services</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.activeServices}</div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.pendingServices}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting activation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center text-base sm:text-lg">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          {recentActivity.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-muted-foreground">
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-0.5 sm:mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs sm:text-sm font-medium leading-tight truncate">
                      {getActivityText(activity)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {activity.amount && (
                    <Badge variant="secondary" className="ml-auto shrink-0 text-xs">
                      ${activity.amount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
