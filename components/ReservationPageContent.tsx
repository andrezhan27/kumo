"use client";

import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/components/LanguageProvider";
import { restaurantInfo, reservationSlug } from "@/lib/content";

export function ReservationPageContent() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="fixed inset-0 overflow-hidden overscroll-none bg-background pt-16" id="main-content">
        <h1 className="sr-only">{t.reservation.title}</h1>
        <iframe name="kumo-reservation" className="block h-full min-h-0 w-full border-0 bg-background" data-restaurant-slug={reservationSlug} loading="eager" src={restaurantInfo.reservationWidgetUrl} title={t.reservation.iframeTitle} />
      </main>
    </>
  );
}
