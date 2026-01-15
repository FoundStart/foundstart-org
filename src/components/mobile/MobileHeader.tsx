import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthProvider';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
}

const MobileHeader = ({ title, showBack = false }: MobileHeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur-lg border-b border-border lg:hidden">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-3">
          {showBack ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-10 w-10 touch-manipulation"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold gradient-text">FoundStart</span>
            </Link>
          )}
          {title && showBack && (
            <h1 className="text-lg font-semibold truncate max-w-[200px]">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-10 w-10 touch-manipulation"
            >
              <Link to="/dashboard">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              asChild
              className="touch-manipulation"
            >
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
