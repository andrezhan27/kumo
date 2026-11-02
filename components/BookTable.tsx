"use client";

import { ArrowUpRight, CalendarDays, Clock, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { restaurantInfo, reservationHref } from "@/lib/content";
import { MagneticButton } from "@/components/MagneticButton";

const mapEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40013.43543086484!2d4.377008137598235!3d50.70184374285622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3d1002ab15385%3A0xdb6f77222b6bb2fe!2sKUMO!5e0!3m2!1sen!2spt!4v1792687814448!5m2!1sen!2spt";

export function BookTable() {
  const { t, language } = useLanguage();
  const contactCards = [
    { href: restaurantInfo.mapHref, icon: MapPin, label: t.booking.addressLabel, value: language === "fr" ? restaurantInfo.address : restaurantInfo.address.replace("Belgique", language === "nl" ? "België" : "Belgium") },
    { href: restaurantInfo.phoneHref, icon: Phone, label: t.booking.phoneLabel, value: restaurantInfo.phone },
  ];
  return (
    <section className="section-dark bg-background py-section" id="booking">
      <div className="section-shell">
        <h2 className="display-heading text-5xl leading-none text-ink md:text-7xl">{t.booking.title}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">{t.booking.description}</p>
        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
          <div className="flex flex-col gap-4">
            {contactCards.map(card => <a className="group flex gap-4 rounded-lg border border-line/55 bg-surface px-4 py-5 transition-colors hover:border-gold-deep/45 sm:items-center sm:px-6" href={card.href} key={card.label} rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined} target={card.href.startsWith("http") ? "_blank" : undefined}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-surface-strong ring-1 ring-line/45"><card.icon className="h-5 w-5 text-gold-deep" strokeWidth={1.5} /></span>
              <span className="min-w-0"><span className="label-caps block text-gold-deep">{card.label}</span><span className="mt-2 block break-words text-sm font-semibold leading-6 text-ink group-hover:text-gold-deep sm:text-base">{card.value}</span></span>
            </a>)}
            <div className="flex gap-4 rounded-lg border border-line/55 bg-surface px-4 py-5 sm:px-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-surface-strong ring-1 ring-line/45"><Clock className="h-5 w-5 text-gold-deep" strokeWidth={1.5} /></span>
              <div className="min-w-0 flex-1">
                <h3 className="label-caps text-gold-deep">{t.booking.hoursLabel}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink sm:text-base">{t.booking.daysLabel}</p>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-sm leading-6 text-ink-muted">
                  <div><dt>{t.booking.lunchLabel}</dt><dd>{restaurantInfo.hours.lunch}</dd></div>
                  <div><dt>{t.booking.dinnerLabel}</dt><dd>{restaurantInfo.hours.dinner}</dd></div>
                </dl>
                <p className="mt-3 text-xs font-semibold text-ink-muted">{t.booking.closedLabel}</p>
              </div>
            </div>
            <div className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <MagneticButton className="gap-2 px-4" href={reservationHref}><CalendarDays className="h-4 w-4 shrink-0" />{t.booking.call}</MagneticButton>
              <a className="label-caps inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line/70 bg-surface px-4 py-4 text-ink transition-colors hover:border-gold-deep" href={restaurantInfo.mapHref} rel="noopener noreferrer" target="_blank">{t.booking.directions}<ArrowUpRight className="h-4 w-4 shrink-0" /></a>
            </div>
          </div>
          <div className="min-h-80 overflow-hidden rounded-lg border border-line/55 bg-surface-strong lg:min-h-[450px]">
            <iframe name="kumo-location" allowFullScreen className="h-full min-h-80 w-full lg:min-h-[450px]" height="450" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src={mapEmbed} style={{ border: 0 }} title={t.booking.mapTitle} width="600" />
          </div>
        </div>
      </div>
    </section>
  );
}
