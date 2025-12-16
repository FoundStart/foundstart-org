import { Link, useLocation } from 'react-router-dom';
import { Globe, Users, UserCheck, Briefcase, Globe2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { 
      icon: Globe, 
      label: 'Countries', 
      href: '/countries', 
      isActive: location.pathname === '/countries' 
    },
    { 
      icon: Users, 
      label: 'Partners', 
      href: '/digital-partners', 
      isActive: location.pathname.includes('/digital-partners'),
      badge: '375+'
    },
    { 
      icon: Globe2, 
      label: 'Domains', 
      href: '/domains', 
      isActive: location.pathname === '/domains'
    },
    { 
      icon: Briefcase, 
      label: 'Services', 
      href: '/services', 
      isActive: location.pathname === '/services' 
    }
  ];

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 safe-area-bottom"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <ul className="flex items-center justify-around py-2 px-4 list-none m-0 p-0">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center min-w-0 py-2 px-1 text-xs transition-colors touch-manipulation",
                  item.isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={item.label}
                aria-current={item.isActive ? "page" : undefined}
              >
                <div className="relative">
                  <Icon 
                    className={cn(
                      "w-5 h-5 mb-1",
                      item.isActive ? "text-primary" : ""
                    )} 
                    aria-hidden="true"
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center font-medium" aria-label={`${item.badge} partners`}>
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
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;