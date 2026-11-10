
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageToggle = () => {
  const { language, setLanguage } = useTranslation();
  const chooseLanguage = (lang: 'en' | 'ar') => {
    // Article language is encoded in its paired URL, not only in UI state.
    const alternate = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${lang}"]`);
    if (window.location.pathname.startsWith('/blog/') && alternate?.href) {
      const target = new URL(alternate.href, window.location.href);
      if (target.origin === window.location.origin && target.pathname.startsWith('/blog/')) {
        target.searchParams.set('lang', lang);
        setLanguage(lang);
        window.location.assign(target.href);
        return;
      }
    }
    setLanguage(lang);
  };
  const chooseLanguage = (lang: 'en' | 'ar') => {
    // Article language is encoded in its paired URL, not only in UI state.
    const alternate = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${lang}"]`);
    if (window.location.pathname.startsWith('/blog/') && alternate?.href) {
      const target = new URL(alternate.href, window.location.href);
      if (target.origin === window.location.origin && target.pathname.startsWith('/blog/')) {
        target.searchParams.set('lang', lang);
        setLanguage(lang);
        window.location.assign(target.href);
        return;
      }
    }
    setLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border shadow-lg z-50">
        <DropdownMenuItem
          onClick={() => chooseLanguage('en')}
          className={`cursor-pointer ${language === 'en' ? 'bg-accent' : ''}`}
        >
          <span className="mr-2">🇺🇸</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => chooseLanguage('ar')}
          className={`cursor-pointer ${language === 'ar' ? 'bg-accent' : ''}`}
        >
          <span className="mr-2">🇸🇦</span>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
