
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FS</span>
              </div>
              <span className="text-xl font-bold gradient-text">FoundStart</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                Partners <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/digital-partners">Digital Partners (233+)</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/freelancer-partners">Freelancer Partners (100+)</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/seo-management" className="text-sm font-medium hover:text-primary transition-colors">
              SEO Suite
            </Link>
          </nav>

          {/* Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <SignedOut>
              <SignInButton>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignInButton>
                <Button size="sm">
                  Get Started
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <a
                href="#services"
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <Link
                to="/digital-partners"
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Digital Partners (233+)
              </Link>
              <Link
                to="/freelancer-partners"
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Freelancer Partners (100+)
              </Link>
              <Link
                to="/seo-management"
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                SEO Suite
              </Link>
              <div className="px-3 py-2 space-y-2">
                <SignedOut>
                  <SignInButton>
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignInButton>
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-start">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
