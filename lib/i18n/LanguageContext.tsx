'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ko from './locales/ko.json';
import en from './locales/en.json';
import ja from './locales/ja.json';
import zhHans from './locales/zh-Hans.json';
import th from './locales/th.json';

export type Language = 'ko' | 'en' | 'ja' | 'zh-Hans' | 'th';

type Translations = typeof ko;

const translations: Record<Language, Translations> = {
  ko,
  en,
  ja,
  'zh-Hans': zhHans,
  th,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ko');

  // 초기 언어 설정 (localStorage에서 불러오기)
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);

    // HTML lang 속성 업데이트
    document.documentElement.lang = lang;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
