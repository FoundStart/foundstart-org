
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  CreditCard, 
  Globe, 
  Smartphone, 
  Mail, 
  Server,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const services = [
    {
      id: 'company',
      name: 'Company Formation',
      icon: Building2,
      status: 'completed',
      progress: 100,
      description: 'LLC formed in Delaware'
    },
    {
      id: 'domain',
      name: 'Domain Registration',
      icon: Globe,
      status: 'completed',
      progress: 100,
      description: 'yourcompany.com secured'
    },
    {
      id: 'hosting',
      name: 'Web Hosting',
      icon: Server,
      status: 'active',
      progress: 100,
      description: 'Cloud hosting active'
    },
    {
      id: 'email',
      name: 'Business Email',
      icon: Mail,
      status: 'active',
      progress: 100,
      description: '10 email accounts setup'
    },
    {
      id: 'website',
      name: 'Website Platform',
      icon: TrendingUp,
      status: 'in-progress',
      progress: 75,
      description: 'SaaS platform development'
    },
    {
      id: 'mobile',
      name: 'Mobile Application',
      icon: Smartphone,
      status: 'pending',
      progress: 25,
      description: 'iOS/Android development'
    },
    {
      id: 'banking',
      name: 'Business Banking',
      icon: CreditCard,
      status: 'pending',
      progress: 0,
      description: 'Account opening in progress'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'active': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Your <span className="gradient-text">Business Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track the progress of all your business services in one centralized location.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card animate-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Services</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <Building2 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-500">3</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-500">2</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-gray-500">2</p>
                </div>
                <AlertCircle className="w-8 h-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const StatusIcon = getStatusIcon(service.status);
            return (
              <Card key={service.id} className="hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <service.icon className="w-6 h-6 text-primary" />
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                    </div>
                    <Badge className={`${getStatusColor(service.status)} text-white`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {service.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{service.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${service.progress}%` }}
                      />
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
