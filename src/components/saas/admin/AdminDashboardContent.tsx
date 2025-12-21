import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, DollarSign, ShoppingCart } from 'lucide-react';

const AdminOverview = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Admin Overview</h1>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Users</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">1,234</div></CardContent></Card>
      <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Companies</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">567</div></CardContent></Card>
      <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$45,678</div></CardContent></Card>
      <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Orders</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">890</div></CardContent></Card>
    </div>
  </div>
);

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">{title}</h1>
    <Card><CardContent className="py-12 text-center text-muted-foreground">Admin {title} management coming soon.</CardContent></Card>
  </div>
);

const AdminDashboardContent = () => {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background px-4 lg:px-6">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex-1" />
      </header>
      <div className="flex-1 p-4 lg:p-6">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<PlaceholderPage title="Users" />} />
          <Route path="companies" element={<PlaceholderPage title="Companies" />} />
          <Route path="services" element={<PlaceholderPage title="Services" />} />
          <Route path="orders" element={<PlaceholderPage title="Orders" />} />
          <Route path="payments" element={<PlaceholderPage title="Payments" />} />
          <Route path="prompts" element={<PlaceholderPage title="AI Prompts" />} />
          <Route path="logs" element={<PlaceholderPage title="Activity Logs" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
