import { ReservationPageContent } from "@/components/ReservationPageContent";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("nl", "/reservation");

export default function BookATablePage() {
  return <ReservationPageContent />;
}
