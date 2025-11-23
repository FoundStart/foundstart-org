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
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Stats {
  totalUsers: number;
  totalServices: number;
  activeServices: number;
  pendingServices: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

interface RecentActivity {
  id: string;
  type: 'user_signup' | 'service_purchase' | 'service_activated';
  user_email: string;
  service_name?: string;
  timestamp: string;
  amount?: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
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
    
    // Set up realtime subscription for new services
    const channel = supabase
      .channel('admin-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'services'
        },
        () => {
          fetchStats();
          fetchRecentActivity();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'profiles'
        },
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
      // Get recent service purchases
      const { data: recentServices } = await supabase
        .from('services')
        .select(`
          id,
          service_name,
          price,
          status,
          purchased_at,
          profiles!services_user_id_fkey (email)
        `)
        .order('purchased_at', { ascending: false })
        .limit(10);

      // Get recent user signups
      const { data: recentUsers } = await supabase
        .from('profiles')
        .select('user_id, email, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const activities: RecentActivity[] = [];

      // Add user signups
      recentUsers?.forEach(user => {
        activities.push({
          id: `signup-${user.user_id}`,
          type: 'user_signup',
          user_email: user.email || 'Unknown',
          timestamp: user.created_at,
        });
      });

      // Add service purchases
      recentServices?.forEach(service => {
        const profile = service.profiles as any;
        activities.push({
          id: `service-${service.id}`,
          type: service.status === 'active' ? 'service_activated' : 'service_purchase',
          user_email: profile?.email || 'Unknown',
          service_name: service.service_name,
          timestamp: service.purchased_at,
          amount: Number(service.price),
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
      default:
        return 'Unknown activity';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Overview of platform performance and activity</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered platform users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalServices}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeServices} active, {stats.pendingServices} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              All-time revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Status Breakdown */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeServices}</div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Services</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingServices}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting activation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Service Value</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalServices > 0 ? (stats.totalRevenue / stats.totalServices).toFixed(0) : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Per service
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No recent activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {getActivityText(activity)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {activity.amount && (
                    <Badge variant="secondary" className="ml-auto">
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
