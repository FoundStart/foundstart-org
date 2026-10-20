import { useTranslation } from '@/contexts/TranslationContext';

// Inline EN/AR picker: const L = useL(); L('Save', 'حفظ')
export const useL = () => {
  const { language } = useTranslation();
  return (en: string, ar: string) => (language === 'ar' ? ar : en);
};
