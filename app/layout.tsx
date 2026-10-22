import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/LanguageProvider";
import { restaurantInfo } from "@/lib/content";
import "./globals.css";

const manrope = localFont({ src: "./fonts/manrope-latin.woff2", variable: "--font-manrope", display: "swap", weight: "400 700" });

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = new URL(process.env.SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000"));
if (!["https:", "http:"].includes(siteUrl.protocol) || siteUrl.username || siteUrl.password) {
  throw new Error("SITE_URL must be a public http:// or https:// origin without credentials.");
}
const siteOrigin = siteUrl.origin;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "KUMO | Restaurant asiatique à Waterloo",
  description: "Découvrez KUMO à Waterloo : sushis, teppanyaki et cuisine asiatique dans un cadre chaleureux au centre Rich’l. Drève Richelle 8. Réservations : +32 2 767 63 98.",
  icons: { icon: "/favicon.png?v=2", apple: "/apple-touch-icon.png?v=2" },
  openGraph: {
    title: "KUMO | Restaurant asiatique à Waterloo",
    description: "Un nuage de saveurs à Waterloo. Sushis, teppanyaki et découvertes à partager au centre Rich’l.",
    locale: "fr_BE", alternateLocale: ["en_GB"], type: "website",
    images: [{ url: "/social/kumo.jpg", width: 1200, height: 630, alt: "Le restaurant KUMO à Waterloo" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#080706" };

const restaurantSchema = {
  "@context": "https://schema.org", "@type": "Restaurant", name: "KUMO",
  description: "Restaurant asiatique au centre Rich’l à Waterloo.",
  servesCuisine: ["Asian", "Japanese", "Sushi", "Teppanyaki"],
  telephone: restaurantInfo.phone, hasMap: restaurantInfo.mapHref,
  address: { "@type": "PostalAddress", streetAddress: "Drève Richelle 8", addressLocality: "Waterloo", postalCode: "1410", addressCountry: "BE" },
  geo: { "@type": "GeoCoordinates", latitude: 50.7097007, longitude: 4.4029045 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "12:00", closes: "14:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "18:30", closes: "22:30" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={manrope.variable} lang="fr">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema).replace(/</g, "\\u003c") }} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
