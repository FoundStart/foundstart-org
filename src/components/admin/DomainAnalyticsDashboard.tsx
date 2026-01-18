import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
  ArrowUp,
  ArrowDown,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface InquiryStats {
  total: number;
  pending: number;
  responded: number;
  converted: number;
  rejected: number;
  conversionRate: number;
}

interface DomainPopularity {
  domain: string;
  count: number;
}

interface DailyTrend {
  date: string;
  count: number;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const DomainAnalyticsDashboard = () => {
  const [stats, setStats] = useState<InquiryStats | null>(null);
  const [popularDomains, setPopularDomains] = useState<DomainPopularity[]>([]);
  const [dailyTrends, setDailyTrends] = useState<DailyTrend[]>([]);
  const [statusDistribution, setStatusDistribution] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async () => {
    try {
      // Fetch all inquiries
      const { data: inquiries, error } = await supabase
        .from('domain_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!inquiries) return;

      // Calculate stats
      const total = inquiries.length;
      const pending = inquiries.filter(i => i.status === 'pending').length;
      const responded = inquiries.filter(i => i.status === 'responded').length;
      const converted = inquiries.filter(i => i.status === 'converted').length;
      const rejected = inquiries.filter(i => i.status === 'rejected').length;
      const conversionRate = total > 0 ? (converted / total) * 100 : 0;

      setStats({
        total,
        pending,
        responded,
        converted,
        rejected,
        conversionRate
      });

      // Calculate status distribution for pie chart
      setStatusDistribution([
        { name: 'Pending', value: pending },
        { name: 'Responded', value: responded },
        { name: 'Converted', value: converted },
        { name: 'Rejected', value: rejected }
      ].filter(item => item.value > 0));

      // Calculate popular domains
      const domainCounts: Record<string, number> = {};
      inquiries.forEach(inquiry => {
        domainCounts[inquiry.domain_name] = (domainCounts[inquiry.domain_name] || 0) + 1;
      });

      const sortedDomains = Object.entries(domainCounts)
        .map(([domain, count]) => ({ domain, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setPopularDomains(sortedDomains);

      // Calculate daily trends (last 30 days)
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);

      const dailyCounts: Record<string, number> = {};
      
      // Initialize all days with 0
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        dailyCounts[dateStr] = 0;
      }

      // Count inquiries per day
      inquiries.forEach(inquiry => {
        const date = new Date(inquiry.created_at).toISOString().split('T')[0];
        if (dailyCounts.hasOwnProperty(date)) {
          dailyCounts[date]++;
        }
      });

      const trends = Object.entries(dailyCounts)
        .map(([date, count]) => ({ 
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
          count 
        }))
        .reverse();

      setDailyTrends(trends);

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();

    // Set up realtime subscription for live updates
    const channel = supabase
      .channel('analytics-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'domain_inquiries'
        },
        () => {
          // Refresh analytics on any change
          fetchAnalytics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnalytics();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            Domain Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track inquiry trends and conversion rates
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
          className="w-full sm:w-auto"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <p className="text-xl md:text-2xl font-bold">{stats?.total || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-muted-foreground">Pending</span>
            </div>
            <p className="text-xl md:text-2xl font-bold">{stats?.pending || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">Responded</span>
            </div>
            <p className="text-xl md:text-2xl font-bold">{stats?.responded || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs text-muted-foreground">Converted</span>
            </div>
            <p className="text-xl md:text-2xl font-bold">{stats?.converted || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-xs text-muted-foreground">Rejected</span>
            </div>
            <p className="text-xl md:text-2xl font-bold">{stats?.rejected || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-muted-foreground">Conv. Rate</span>
            </div>
            <p className="text-xl md:text-2xl font-bold">{stats?.conversionRate.toFixed(1) || 0}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Daily Trends */}
        <Card>
          <CardHeader className="p-4 md:p-6 pb-2">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              Daily Inquiry Trends (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6 pt-0">
            <div className="h-48 md:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tick={{ fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    className="text-xs" 
                    tick={{ fontSize: 10 }}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader className="p-4 md:p-6 pb-2">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6 pt-0">
            <div className="h-48 md:h-64 w-full">
              {statusDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  No data available
                </div>
              )}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {statusDistribution.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {entry.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Domains */}
      <Card>
        <CardHeader className="p-4 md:p-6 pb-2">
          <CardTitle className="text-base md:text-lg flex items-center gap-2">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            Most Popular Domains
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6 pt-0">
          {popularDomains.length > 0 ? (
            <div className="h-64 md:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={popularDomains} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10 }} />
                  <YAxis 
                    type="category" 
                    dataKey="domain" 
                    width={120}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]}
                    name="Inquiries"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
              No domain inquiries yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainAnalyticsDashboard;
