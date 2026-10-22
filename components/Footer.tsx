"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { brandName, restaurantInfo } from "@/lib/content";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-background/10 bg-night py-12 text-background sm:py-16">
      <div className="section-shell grid gap-10 md:grid-cols-2">
        <div>
          <Link className="display-heading inline-flex items-center gap-3 text-3xl tracking-[0.08em] hover:text-gold" href="/">
            <Image alt="" aria-hidden src="/kumo-logo-blue.webp" width={48} height={48} className="h-12 w-12 rounded-full" />{brandName}
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-background/70">{t.footer.note}</p>
        </div>
        <div className="flex flex-col gap-8 md:items-end">
          <nav aria-label={t.footer.navigationLabel} className="flex flex-wrap gap-x-6 gap-y-5">
            {[{ href: "#menu-section", label: t.nav.menu }, { href: "#pricing", label: t.nav.pricing }, { href: "#space", label: t.nav.space }, { href: "#booking", label: t.nav.contact }].map(item => <a className="label-caps text-background/75 hover:text-gold" href={`/${item.href}`} key={item.href}>{item.label}</a>)}
          </nav>
          <a className="inline-flex items-center gap-2 text-sm text-background/70 hover:text-gold" href={restaurantInfo.mapHref} rel="noopener noreferrer" target="_blank"><MapPin className="h-4 w-4" />{t.footer.location}</a>
        </div>
        <p className="border-t border-background/15 pt-6 text-xs leading-6 text-background/65 md:col-span-2">© {new Date().getFullYear()} {brandName}. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
