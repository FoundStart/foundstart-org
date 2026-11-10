import { shortetArticles as baseArticles } from '@/data/shortetArticlesData';
import { foundstartArticles } from '@/data/foundstartArticles';
import { shortetArticlesAr } from '@/data/shortetArticlesAr';
import { agencyArticles } from '@/data/foundstartAgencyArticles';
const articlePairs = { ...baseArticles, ...foundstartArticles, ...shortetArticlesAr, ...agencyArticles };

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
    const match = window.location.pathname.match(/^\/blog\/([^/]+)\/?$/);
    if (match) {
      const current = decodeURIComponent(match[1]);
      const base = current.endsWith('-ar') ? current.slice(0, -3) : current;
      const next = lang === 'ar' ? `${base}-ar` : base;
      if (articlePairs[current] && articlePairs[next]) {
        const target = new URL(window.location.href);
        target.pathname = `/blog/${next}`;
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
