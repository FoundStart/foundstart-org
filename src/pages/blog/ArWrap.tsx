import React, { useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

const ArWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage } = useTranslation();
  useEffect(() => { if (language !== 'ar') setLanguage('ar'); }, []);
  return <div dir="rtl" lang="ar">{children}</div>;
};

export default ArWrap;
