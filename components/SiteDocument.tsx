"use client";

import type { ReactNode } from "react";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/components/LanguageProvider";
import type { Language } from "@/lib/content";
import { languageFromPath } from "@/lib/i18n";
import "@/app/globals.css";

const manrope = localFont({ src: "../app/fonts/manrope-latin.woff2", variable: "--font-manrope", display: "swap", weight: "400 700" });
const bodoni = localFont({ src: "../app/fonts/bodoni-moda-latin.woff2", variable: "--font-bodoni", display: "swap", weight: "400 900" });

export function SiteDocument({ children, language: fixedLanguage }: { children: ReactNode; language?: Language }) {
  const pathname = usePathname();
  const language = fixedLanguage ?? languageFromPath(pathname ?? "/");
  return (
    <html className={`${manrope.variable} ${bodoni.variable}`} lang={language}>
      <body>
        <LanguageProvider language={language}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
