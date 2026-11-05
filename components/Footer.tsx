"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { brandName, restaurantInfo } from "@/lib/content";

export function Footer() {
  const { t, language, localizeHref } = useLanguage();
  const address = language === "fr" ? restaurantInfo.address : restaurantInfo.address.replace("Belgique", language === "nl" ? "België" : "Belgium");
  return (
    <footer className="border-t border-line/50 bg-night py-12 text-ink sm:py-16">
      <div className="section-shell grid gap-10 md:grid-cols-2">
        <div>
          <Link className="display-heading inline-flex items-center gap-3 text-3xl tracking-[0.08em] text-gold" href={localizeHref("/")}>
            <Image alt="" aria-hidden src="/kumo-logo-gold.jpg" width={64} height={64} className="h-16 w-16 rounded-full object-cover brightness-125 mix-blend-lighten" />{brandName}
          </Link>
          <h2 className="mt-6 text-base font-medium text-gold tracking-tight">{t.footer.title}</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink-muted">{t.footer.note}</p>
          <address className="mt-5 flex flex-col gap-2 text-sm leading-6 text-ink-muted not-italic">
            <a aria-label={`${t.footer.addressLabel} : ${address}`} className="hover:text-gold" href={restaurantInfo.mapHref} rel="noopener noreferrer" target="_blank">{address}</a>
            <a aria-label={`${t.footer.phoneLabel} : ${restaurantInfo.phone}`} className="w-fit hover:text-gold" href={restaurantInfo.phoneHref}>{restaurantInfo.phone}</a>
          </address>
        </div>
        <div className="flex flex-col gap-8 md:items-end">
          <nav aria-label={t.footer.navigationLabel} className="flex flex-wrap gap-x-6 gap-y-5">
            {[{ href: "/menu", label: t.nav.menu }, { href: "/#pricing", label: t.nav.pricing }, { href: "/#space", label: t.nav.space }, { href: "/#booking", label: t.nav.contact }].map(item => <a className="label-caps text-gold underline-offset-4 hover:underline" href={localizeHref(item.href)} key={item.href}>{item.label}</a>)}
          </nav>
          <a className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-gold" href={restaurantInfo.mapHref} rel="noopener noreferrer" target="_blank"><MapPin className="h-4 w-4" />{t.footer.location}</a>
        </div>
        <p className="border-t border-line/50 pt-6 text-xs leading-6 text-ink-muted md:col-span-2">© {new Date().getFullYear()} {brandName}. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
