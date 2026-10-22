"use client";

import { useLanguage } from "@/components/LanguageProvider";
import type { Language } from "@/lib/content";

const options: Language[] = ["fr", "en"];

export function LanguageToggle({ inverted = false }: { inverted?: boolean }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div aria-label="Langue / Language" className={`grid h-10 w-24 shrink-0 grid-cols-2 rounded-lg border p-1 transition-colors sm:w-[108px] ${inverted ? "border-background/35 bg-background/10" : "border-line/70 bg-surface"}`} role="group">
      {options.map(option => (
        <button aria-label={option === "fr" ? "Français" : "English"} aria-pressed={language === option} className={`label-caps rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${language === option ? inverted ? "bg-background text-ink" : "bg-ink text-background" : inverted ? "text-background/80 hover:text-background" : "text-ink-muted hover:text-ink"}`} key={option} lang={option} onClick={() => setLanguage(option)} type="button">
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
