import type { Metadata } from "next";
import { restaurantInfo, type Language } from "@/lib/content";
import { localizedHref } from "@/lib/i18n";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = new URL(process.env.SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000"));
if (!["https:", "http:"].includes(siteUrl.protocol) || siteUrl.username || siteUrl.password) {
  throw new Error("SITE_URL must be a public http:// or https:// origin without credentials.");
}
export const siteOrigin = siteUrl.origin;

const copy = {
  fr: {
    title: "KUMO | Restaurant asiatique, sushi & teppanyaki à Waterloo",
    description: "Sushis, teppanyaki et dim sum chez KUMO, restaurant asiatique au centre Rich’l à Waterloo, en Brabant wallon. Découvrez notre espace et réservez votre table.",
    reservationTitle: "Réserver une table à Waterloo | KUMO",
    reservationDescription: "Réservez votre table chez KUMO, restaurant asiatique au centre Rich’l à Waterloo. Déjeuner ou dîner, Drève Richelle 8. Téléphone : +32 2 767 63 98.",
    imageAlt: "Le restaurant asiatique KUMO à Waterloo, Belgique",
  },
  en: {
    title: "KUMO | Asian Restaurant, Sushi & Teppanyaki in Waterloo, Belgium",
    description: "Discover sushi, teppanyaki and dim sum at KUMO, an Asian restaurant at Rich’l in Waterloo, Belgium, south of Brussels. Explore our space and book your table.",
    reservationTitle: "Book a Table in Waterloo, Belgium | KUMO",
    reservationDescription: "Book lunch or dinner at KUMO Asian restaurant at Rich’l in Waterloo, Belgium. Find us at Drève Richelle 8 or call +32 2 767 63 98.",
    imageAlt: "KUMO Asian restaurant in Waterloo, Belgium",
  },
};

export function pageMetadata(language: Language, path = "/"): Metadata {
  const content = copy[language];
  const isReservation = path === "/reservation";
  const title = isReservation ? content.reservationTitle : content.title;
  const description = isReservation ? content.reservationDescription : content.description;
  const url = localizedHref(path, language);
  return {
    metadataBase: new URL(siteOrigin),
    title,
    description,
    applicationName: "KUMO",
    alternates: {
      canonical: url,
      languages: { "fr-BE": localizedHref(path, "fr"), en: localizedHref(path, "en"), "x-default": localizedHref(path, "fr") },
    },
    icons: { icon: "/favicon.png?v=2", apple: "/apple-touch-icon.png?v=2" },
    openGraph: {
      title, description, url, siteName: "KUMO",
      locale: language === "fr" ? "fr_BE" : "en_GB",
      alternateLocale: [language === "fr" ? "en_GB" : "fr_BE"],
      type: "website",
      images: [{ url: "/social/kumo.jpg", width: 1200, height: 630, alt: content.imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: "/social/kumo.jpg", alt: content.imageAlt }] },
  };
}

export const restaurantSchema = {
  "@context": "https://schema.org", "@type": "Restaurant", "@id": `${siteOrigin}/#restaurant`, name: "KUMO",
  url: `${siteOrigin}/`,
  description: "Restaurant asiatique au centre Rich’l à Waterloo : sushis, teppanyaki et dim sum, en Brabant wallon, Belgique.",
  image: [`${siteOrigin}/social/kumo.jpg`, `${siteOrigin}/space/dining.webp`, `${siteOrigin}/food/sushi.webp`],
  logo: `${siteOrigin}/kumo-logo-blue.webp`,
  servesCuisine: ["Asian", "Japanese", "Sushi", "Teppanyaki", "Dim sum"],
  telephone: restaurantInfo.phone, hasMap: restaurantInfo.mapHref,
  hasMenu: `${siteOrigin}/#menu-section`,
  acceptsReservations: true,
  potentialAction: {
    "@type": "ReserveAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteOrigin}/reservation`, inLanguage: ["fr", "en"] },
    result: { "@type": "FoodEstablishmentReservation", name: "Réservation chez KUMO" },
  },
  address: { "@type": "PostalAddress", streetAddress: "Drève Richelle 8", addressLocality: "Waterloo", addressRegion: "Brabant wallon", postalCode: "1410", addressCountry: "BE" },
  geo: { "@type": "GeoCoordinates", latitude: 50.7097007, longitude: 4.4029045 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "12:00", closes: "14:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "18:30", closes: "22:30" },
  ],
};
