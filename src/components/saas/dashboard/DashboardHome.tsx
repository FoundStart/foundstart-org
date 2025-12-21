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
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';

const DashboardHome = () => {
  const { user } = useAuth();

  // Mock data - will be replaced with real data
  const stats = [
    { title: 'Companies', value: '2', icon: Building2, color: 'text-primary' },
    { title: 'Active Services', value: '5', icon: ShoppingCart, color: 'text-green-500' },
    { title: 'Documents', value: '12', icon: FileText, color: 'text-blue-500' },
    { title: 'Pending Payments', value: '$450', icon: CreditCard, color: 'text-orange-500' },
  ];

  const recentActivity = [
    { action: 'Company formation submitted', entity: 'TechStart LLC', time: '2 hours ago', status: 'pending' },
    { action: 'Document uploaded', entity: 'Operating Agreement', time: '1 day ago', status: 'completed' },
    { action: 'Service ordered', entity: 'Registered Agent - Wyoming', time: '2 days ago', status: 'processing' },
    { action: 'Payment received', entity: 'Invoice #INV-001', time: '3 days ago', status: 'completed' },
  ];

  const companyProgress = [
    { name: 'TechStart LLC', country: 'USA', progress: 75, status: 'In Progress' },
    { name: 'GlobalTech Ltd', country: 'UK', progress: 100, status: 'Completed' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
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
            {companyProgress.length > 0 ? (
              companyProgress.map((company, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <p className="text-sm text-muted-foreground">{company.country}</p>
                    </div>
                    <Badge variant={company.progress === 100 ? 'default' : 'secondary'}>
                      {company.status}
                    </Badge>
                  </div>
                  <Progress value={company.progress} className="h-2" />
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

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.entity}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
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
                <ArrowRight className="h-6 w-6" />
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
