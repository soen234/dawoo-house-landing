export const locales = ['ko', 'en', 'ja', 'zh-Hans', 'th'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export const languageNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  'zh-Hans': '简体中文',
  th: 'ไทย',
};

export function getLocale(locale: string): Locale {
  if (locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return defaultLocale;
}
