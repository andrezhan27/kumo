import type { ReactNode } from "react";
import type { Viewport } from "next";
import { SiteDocument } from "@/components/SiteDocument";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en");
export const viewport: Viewport = { themeColor: "#080706" };

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteDocument language="en">{children}</SiteDocument>;
}
