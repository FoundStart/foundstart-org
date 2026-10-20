import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, Briefcase, UserPlus, BookOpen } from 'lucide-react';
import { SHOW_REGISTRATION } from '@/config/features';
import { useAuth } from '@/contexts/AuthProvider';
import { cn } from '@/lib/utils';

const MobileBottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

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
      isActive: location.pathname === '/countries' || location.pathname.startsWith('/country/')
    },
    { 
      icon: Briefcase, 
      label: 'Services', 
      href: '/services', 
      isActive: location.pathname.startsWith('/services')
    },
    SHOW_REGISTRATION
      ? (user ? { icon: Briefcase, label: 'Dashboard', href: '/dashboard', isActive: location.pathname.startsWith('/dashboard') } : { icon: UserPlus, label: 'Register', href: '/auth', isActive: location.pathname === '/auth' })
      : { icon: BookOpen, label: 'Blog', href: '/blog', isActive: location.pathname.startsWith('/blog') },
  ];

  if (location.pathname.startsWith('/dashboard')) return null;

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-50 safe-area-bottom"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all touch-manipulation",
                  item.isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                aria-current={item.isActive ? "page" : undefined}
              >
                <Icon className={cn("w-5 h-5", item.isActive && "text-primary")} />
                <span className={cn(
                  "text-[10px] mt-1 font-medium",
                  item.isActive && "text-primary"
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
