import React from 'react';
import DarkLoader from '@/components/DarkLoader';
import { useTranslation } from '@/contexts/TranslationContext';
import { useAuth } from '@/contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import CustomerSidebar from '@/components/saas/CustomerSidebar';
import CustomerDashboardContent from '@/components/saas/CustomerDashboardContent';

const CustomerDashboard = () => {
  const { user, loading } = useAuth();
  const { isRTL } = useTranslation();

  if (loading) {
    return (
      <DarkLoader />
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <SidebarProvider dir="ltr">
      <div className="flex min-h-screen w-full bg-background">
        <CustomerSidebar />
        <main dir={isRTL ? 'rtl' : 'ltr'} className="flex-1 overflow-auto">
          <CustomerDashboardContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CustomerDashboard;
