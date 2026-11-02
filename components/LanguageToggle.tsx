"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import type { Language } from "@/lib/content";
import { localizedHref } from "@/lib/i18n";

const options: { language: Language; label: string }[] = [
  { language: "en", label: "English" },
  { language: "fr", label: "Français" },
  { language: "nl", label: "Nederlands" },
];

export function LanguageToggle({ inverted = false }: { inverted?: boolean }) {
  const { language, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent | FocusEvent) => {
      if (event.target instanceof Node && !dropdownRef.current?.contains(event.target)) {
        dropdownRef.current?.removeAttribute("open");
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dropdownRef.current?.open) {
        dropdownRef.current.open = false;
        dropdownRef.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("focusin", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <details className="language-dropdown group relative shrink-0" ref={dropdownRef}>
      <summary aria-label={t.languageLabel} className={`label-caps flex h-10 cursor-pointer list-none items-center justify-center gap-2 rounded-lg border px-3 transition-colors ${inverted ? "border-background/35 bg-background/10 text-background" : "border-line/70 bg-surface text-ink"}`}>
        <span>{language.toUpperCase()}</span>
        <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="absolute right-0 z-20 mt-2 min-w-40 rounded-lg border border-line/70 bg-background p-1.5 text-ink shadow-soft">
        {options.map(option => (
          <Link aria-current={language === option.language ? "page" : undefined} className={`block rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-surface-strong ${language === option.language ? "bg-ink font-semibold text-background hover:bg-ink" : "text-ink"}`} key={option.language} lang={option.language} hrefLang={option.language} href={localizedHref(pathname, option.language)} scroll={false} onNavigate={event => {
            event.preventDefault();
            dropdownRef.current?.removeAttribute("open");
            dropdownRef.current?.querySelector("summary")?.focus();
            if (option.language === language) return;
            const currentHref = `${pathname}${window.location.search}${window.location.hash}`;
            router.push(localizedHref(currentHref, option.language), { scroll: false });
          }}>
            {option.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
