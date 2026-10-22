"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Language } from "@/lib/content";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)[Language];
};
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("kumo-language");
      // Restore the tab preference after hydration to match the initial French server render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "fr" || saved === "en") setLanguage(saved);
    } catch { /* Language switching also works when storage is unavailable. */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage: (next: Language) => {
      setLanguage(next);
      try { sessionStorage.setItem("kumo-language", next); } catch { /* Optional preference. */ }
    },
    t: translations[language],
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
