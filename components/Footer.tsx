"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { brandName } from "@/lib/content";

const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_URL;
const complaintsBookUrl = "https://www.livroreclamacoes.pt/Inicio/";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.85a8.27 8.27 0 004.83 1.54V6.94a4.84 4.84 0 01-1.06-.25z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const contactHref = pathname === "/" ? "#booking" : "/#booking";

  const navigation = [
    { href: "/menu", label: t.nav.menu, type: "internal" },
    { href: contactHref, label: t.nav.contact, type: "anchor" },
    { href: "/reservar", label: t.nav.book, type: "internal" },
  ] as const;

  return (
    <footer className="border-t border-background/10 bg-night py-12 text-background sm:py-16">
      <div className="section-shell grid gap-12 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(32rem,1.2fr)] lg:gap-20">
        <div className="flex flex-col items-start">
          <Link
            className="display-serif inline-flex items-center gap-3 text-3xl tracking-[0.08em] text-background transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            href="/"
          >
            <Image alt="" aria-hidden src="/sushi-king-logo.png" width={48} height={48} className="h-12 w-12" />
            {brandName}
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-background/60">{t.footer.note}</p>

          <a
            className="mt-10 inline-flex text-sm font-semibold leading-6 text-background/45 transition-colors hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:mt-auto lg:pt-12"
            href="https://intelis.pt/"
            rel="noreferrer"
            target="_blank"
          >
            {t.footer.rights}
          </a>
        </div>

        <div className="flex flex-col items-start lg:items-end">
          <nav aria-label={t.footer.navigationLabel}>
            <ul className="flex flex-wrap gap-x-7 gap-y-5 lg:justify-end">
              {navigation.map((item) => (
                <li key={item.label}>
                  {item.type === "internal" ? (
                    <Link
                      className="label-caps text-background/65 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      className="label-caps text-background/65 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              <li>
                {privacyPolicyUrl ? (
                  <a
                    className="label-caps text-background/65 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    href={privacyPolicyUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t.footer.privacy}
                  </a>
                ) : (
                  <span className="label-caps cursor-not-allowed text-background/30" title={t.footer.privacyUnavailable}>
                    {t.footer.privacy}
                  </span>
                )}
              </li>
              <li>
                <a
                  className="label-caps text-background/65 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  href={complaintsBookUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {t.footer.complaintsBook}
                </a>
              </li>
            </ul>
          </nav>

          <div className="mt-10 flex gap-3">
            <a
              aria-label="Instagram"
              className="grid h-12 w-12 place-items-center rounded-lg border border-background/20 text-background/60 transition-colors hover:border-gold/70 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              href="https://www.instagram.com/sushiking_portugal/"
              rel="noreferrer"
              target="_blank"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              aria-label="TikTok"
              className="grid h-12 w-12 place-items-center rounded-lg border border-background/20 text-background/60 transition-colors hover:border-gold/70 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              href="https://www.tiktok.com/@sushi.king.portugal"
              rel="noreferrer"
              target="_blank"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
