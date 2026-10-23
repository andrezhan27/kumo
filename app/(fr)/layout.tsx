import type { ReactNode } from "react";
import type { Viewport } from "next";
import { SiteDocument } from "@/components/SiteDocument";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("fr");
export const viewport: Viewport = { themeColor: "#080706" };

export default function FrenchLayout({ children }: { children: ReactNode }) {
  return <SiteDocument language="fr">{children}</SiteDocument>;
}
