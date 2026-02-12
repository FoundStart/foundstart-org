import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, Building2, ShoppingCart, FileText, CreditCard, Bot, Activity, Settings, LogOut, Globe, BarChart3, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { Button } from '@/components/ui/button';
import NotificationBell from '@/components/notifications/NotificationBell';

const menuItems = [
  { title: 'Overview', icon: LayoutDashboard, href: '/admin' },
  { title: 'Users', icon: Users, href: '/admin/users' },
  { title: 'Companies', icon: Building2, href: '/admin/companies' },
  { title: 'Services', icon: ShoppingCart, href: '/admin/services' },
  { title: 'Orders', icon: FileText, href: '/admin/orders' },
  { title: 'Domain Inquiries', icon: Globe, href: '/admin/domain-inquiries' },
  { title: 'Domain Analytics', icon: BarChart3, href: '/admin/domain-analytics' },
  { title: 'Payments', icon: CreditCard, href: '/admin/payments' },
  { title: 'Affiliates', icon: LinkIcon, href: '/admin/affiliates' },
  { title: 'AI Prompts', icon: Bot, href: '/admin/prompts' },
  { title: 'Activity Logs', icon: Activity, href: '/admin/logs' },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut, user } = useAuth();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive text-destructive-foreground font-bold">A</div>
            <span className="text-lg font-semibold">Admin Panel</span>
          </Link>
          <NotificationBell />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                    <Link to={item.href}><item.icon className="h-4 w-4" /><span>{item.title}</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <div className="text-sm text-muted-foreground truncate">{user?.email}</div>
        <Button variant="ghost" size="sm" className="justify-start" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
