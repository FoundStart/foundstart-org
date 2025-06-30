
import { useAuth } from '@/contexts/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const AuthenticatedDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Access Dashboard</h2>
                <p className="text-muted-foreground">
                  Please sign in to access your business dashboard and manage your services.
                </p>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link to="/auth">
                    <User className="w-4 h-4 mr-2" />
                    Sign In to Dashboard
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <Link to="/auth">Create Account</Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Secure access to all your business formation and digital services
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return <Dashboard />;
};

export default AuthenticatedDashboard;
