import React from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import CustomerSidebar from '@/components/saas/CustomerSidebar';
import CustomerDashboardContent from '@/components/saas/CustomerDashboardContent';

const CustomerDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <CustomerSidebar />
        <main className="flex-1 overflow-auto">
          <CustomerDashboardContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CustomerDashboard;
