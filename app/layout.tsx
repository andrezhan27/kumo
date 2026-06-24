import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/LanguageProvider";
import { brandName } from "@/lib/content";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${brandName} | Premium Sushi in Faro`,
  description:
    `${brandName} is a premium sushi restaurant in Faro, Portugal, serving refined Japanese flavors in a minimalist atmosphere.`,
  icons: {
    icon: "/favicon.svg",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={`${bodoni.variable} ${manrope.variable}`} lang="pt">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
