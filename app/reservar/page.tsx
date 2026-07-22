import { Navbar } from "@/components/Navbar";
import { restaurantInfo } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservas | Sushi King",
  description:
    "Reserve uma mesa no Sushi King em Faro. Book your table at Sushi King in Faro.",
};

export default function ReservationPage() {
  return (
    <>
      <Navbar />
      <main className="h-svh overflow-hidden bg-surface pt-20">
        <iframe
          className="block h-full min-h-0 w-full border-0 bg-surface"
          loading="eager"
          src={restaurantInfo.reservationWidgetUrl}
          title="Sushi King reservation form"
        />
      </main>
    </>
  );
}
