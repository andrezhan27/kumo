"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { restaurantInfo } from "@/lib/content";

const infoIconClass = "h-5 w-5 text-gold-deep";

export function BookTable() {
  const { t } = useLanguage();

  const contactCards = [
    {
      href: restaurantInfo.mapHref,
      icon: <MapPin className={infoIconClass} />,
      label: t.booking.addressLabel,
      value: restaurantInfo.address,
    },
    {
      href: restaurantInfo.phoneHref,
      icon: <Phone className={infoIconClass} />,
      label: t.booking.phoneLabel,
      value: restaurantInfo.phone,
    },
    {
      href: `mailto:${restaurantInfo.email}`,
      icon: <Mail className={infoIconClass} />,
      label: t.booking.emailLabel,
      value: restaurantInfo.email,
    },
  ];

  return (
    <section className="bg-surface py-section" id="booking">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true, margin: "-120px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="display-serif max-w-2xl text-5xl leading-none text-ink md:text-7xl">
              {t.booking.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-muted">
              {t.booking.description}
            </p>
          </motion.div>

          <motion.div
            className="rounded-md border border-line/55 bg-background p-4 shadow-soft sm:p-6"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            viewport={{ once: true, margin: "-120px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="grid gap-4">
              {contactCards.map((card) => (
                <a
                  className="group flex gap-4 rounded-md border border-line/55 bg-surface px-4 py-5 transition-colors hover:border-gold-deep/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:items-center sm:px-5"
                  href={card.href}
                  key={card.label}
                  rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-background text-gold-deep ring-1 ring-line/45">
                    {card.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="label-caps block text-gold-deep">{card.label}</span>
                    <span className="mt-2 block break-words text-base font-semibold leading-6 text-ink transition-colors group-hover:text-gold-deep">
                      {card.value}
                    </span>
                  </span>
                </a>
              ))}

              <div className="flex gap-4 rounded-md border border-line/55 bg-surface px-4 py-5 sm:px-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-background text-gold-deep ring-1 ring-line/45">
                  <Clock className={infoIconClass} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="label-caps block text-gold-deep">{t.booking.hoursLabel}</span>
                  <p className="mt-2 text-base font-semibold leading-6 text-ink">
                    {t.booking.daysLabel}
                  </p>
                  <div className="mt-3 grid gap-3 text-sm leading-6 text-ink-muted sm:grid-cols-2">
                    <p>
                      {t.booking.lunchLabel} {restaurantInfo.hours.lunch}
                    </p>
                    <p>
                      {t.booking.dinnerLabel} {restaurantInfo.hours.dinner}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
