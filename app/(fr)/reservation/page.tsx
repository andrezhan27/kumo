import { ReservationPageContent } from "@/components/ReservationPageContent";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("fr", "/reservation");

export default function BookATablePage() {
  return <ReservationPageContent />;
}
