import { useState } from 'react';
import { 
  Building2, 
  Globe, 
  CreditCard, 
  Smartphone, 
  Mail, 
  Server,
  TrendingUp,
  Users,
  Settings,
  Home,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Gift,
  Search,
  Target,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  activeService: string;
  onServiceChange: (service: string) => void;
}

const DashboardSidebar = ({ activeService, onServiceChange }: DashboardSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const services = [
    { id: 'overview', name: 'Overview', icon: Home },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet },
    { id: 'company', name: 'Company Formation', icon: Building2 },
    { id: 'domain', name: 'Domain Registration', icon: Globe },
    { id: 'hosting', name: 'Web Hosting', icon: Server },
    { id: 'email', name: 'Business Email', icon: Mail },
    { id: 'website', name: 'Website Platform', icon: TrendingUp },
    { id: 'mobile', name: 'Mobile Application', icon: Smartphone },
    { id: 'banking', name: 'Business Banking', icon: CreditCard },
    { id: 'virtualcards', name: 'Virtual Cards', icon: CreditCard },
    { id: 'esim', name: 'eSIM Cards', icon: Wifi },
    { id: 'giftcards', name: 'Gift Cards', icon: Gift },
    { id: 'seo-optimization', name: 'SEO & Optimization', icon: Search },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'team', name: 'Team Management', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className={cn(
      "bg-card border-r border-border h-full transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-semibold">Dashboard</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Button
              key={service.id}
              variant={activeService === service.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                collapsed && "px-3"
              )}
              onClick={() => onServiceChange(service.id)}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span className="ml-3">{service.name}</span>}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
