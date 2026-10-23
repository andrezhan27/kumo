import type { ReactNode } from "react";
import localFont from "next/font/local";
import { LanguageProvider } from "@/components/LanguageProvider";
import type { Language } from "@/lib/content";
import { restaurantSchema } from "@/lib/seo";
import "@/app/globals.css";

const manrope = localFont({ src: "../app/fonts/manrope-latin.woff2", variable: "--font-manrope", display: "swap", weight: "400 700" });

export function SiteDocument({ children, language }: { children: ReactNode; language: Language }) {
  return (
    <html className={manrope.variable} lang={language}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema).replace(/</g, "\\u003c") }} />
        <LanguageProvider language={language}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
