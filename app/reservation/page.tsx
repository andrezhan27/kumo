import type { Metadata } from "next";
import { ReservationPageContent } from "@/components/ReservationPageContent";
import { brandName } from "@/lib/content";

export const metadata: Metadata = {
  title: `Reservations | ${brandName}`,
  description: "Reserve a table at KUMO in Waterloo. Réservez votre table chez KUMO à Waterloo.",
};

export default function BookATablePage() {
  return <ReservationPageContent />;
}
