
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, User } from 'lucide-react';
import Dashboard from './Dashboard';

const AuthenticatedDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
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
                <Button 
                  onClick={() => setIsAuthenticated(true)}
                  className="w-full"
                  size="lg"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In to Dashboard
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsAuthenticated(true)}
                  className="w-full"
                  size="lg"
                >
                  Create Account
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
