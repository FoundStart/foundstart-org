import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, Users, Briefcase, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      href: '/', 
      isActive: location.pathname === '/' 
    },
    { 
      icon: Globe, 
      label: 'Countries', 
      href: '/countries', 
      isActive: location.pathname === '/countries' 
    },
    { 
      icon: Users, 
      label: 'Partners', 
      href: '/partners', 
      isActive: location.pathname.includes('/partners'),
      badge: '460+'
    },
    { 
      icon: Briefcase, 
      label: 'Services', 
      href: '/services', 
      isActive: location.pathname === '/services' 
    },
    { 
      icon: Newspaper, 
      label: 'Media', 
      href: '/blog', 
      isActive: location.pathname.includes('/blog') || location.pathname.includes('/media') || location.pathname.includes('/press')
    }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 text-xs transition-colors touch-manipulation",
                item.isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon 
                  className={cn(
                    "w-5 h-5 mb-1",
                    item.isActive ? "text-primary" : ""
                  )} 
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={cn(
                "truncate font-medium",
                item.isActive ? "text-primary" : ""
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;