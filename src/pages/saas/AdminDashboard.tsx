import React from 'react';
import DarkLoader from '@/components/DarkLoader';
import { useAuth } from '@/contexts/AuthProvider';
import { Navigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/saas/admin/AdminSidebar';
import AdminDashboardContent from '@/components/saas/admin/AdminDashboardContent';
import { useUserRole } from '@/hooks/useUserRole';

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return (
      <DarkLoader />
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ redirectTo: '/admin' }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-bold">Admin access only</h1>
          <p className="text-muted-foreground">You are signed in as <strong>{user.email}</strong>, which is not an admin account. Sign out and sign in with the admin account to open the admin dashboard.</p>
          <div className="flex justify-center gap-3">
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground" onClick={async () => { await supabase.auth.signOut(); window.location.href = '/auth'; }}>Sign out</button>
            <Link className="rounded-md border px-4 py-2" to="/dashboard">My dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <AdminDashboardContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
