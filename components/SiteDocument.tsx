"use client";

import type { ReactNode } from "react";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/components/LanguageProvider";
import type { Language } from "@/lib/content";
import { languageFromPath } from "@/lib/i18n";
import "@/app/globals.css";

const montserrat = localFont({ src: "../app/fonts/montserrat-latin.woff2", variable: "--font-montserrat", display: "swap", weight: "400 700" });

export function SiteDocument({ children, language: fixedLanguage }: { children: ReactNode; language?: Language }) {
  const pathname = usePathname();
  const language = fixedLanguage ?? languageFromPath(pathname ?? "/");
  return (
    <html className={montserrat.variable} lang={language}>
      <body>
        <LanguageProvider language={language}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
