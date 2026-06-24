"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import type { Language } from "@/lib/content";

const options: Language[] = ["pt", "en"];

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      aria-label="Language selector"
      className="relative grid h-10 w-[116px] grid-cols-2 rounded-full border border-line/70 bg-surface p-1 shadow-sm"
      role="group"
    >
      <motion.div
        animate={{ x: language === "pt" ? 0 : 54 }}
        className="absolute left-1 top-1 h-8 w-[54px] rounded-full bg-ink"
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      />
      {options.map((option) => (
        <button
          aria-pressed={language === option}
          className={`label-caps relative z-10 rounded-full text-center transition-colors ${
            language === option ? "text-background" : "text-ink-muted hover:text-ink"
          }`}
          key={option}
          onClick={() => setLanguage(option)}
          type="button"
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
