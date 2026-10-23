"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { translations, type Language } from "@/lib/content";
import { localizedHref } from "@/lib/i18n";

type LanguageContextValue = {
  language: Language;
  localizeHref: (href: string) => string;
  t: (typeof translations)[Language];
};
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children, language }: { children: ReactNode; language: Language }) {
  const value = useMemo(() => ({
    language,
    localizeHref: (href: string) => localizedHref(href, language),
    t: translations[language],
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
