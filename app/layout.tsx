import type { ReactNode } from "react";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteDocument } from "@/components/SiteDocument";
import { restaurantSchema } from "@/lib/seo";

export const viewport: Viewport = { themeColor: "#1c1b1b" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SiteDocument>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema).replace(/</g, "\\u003c") }} />
      {children}
      <Analytics />
    </SiteDocument>
  );
}
