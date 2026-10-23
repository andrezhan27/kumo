import type { Metadata } from "next";
import { NotFoundPage } from "@/components/NotFoundPage";
import { SiteDocument } from "@/components/SiteDocument";

export const metadata: Metadata = { title: "Page introuvable | KUMO", robots: { index: false, follow: true } };

export default function GlobalNotFound() {
  return <SiteDocument language="fr"><NotFoundPage /></SiteDocument>;
}
