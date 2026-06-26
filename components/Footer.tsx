"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { brandName } from "@/lib/content";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.85a8.27 8.27 0 004.83 1.54V6.94a4.84 4.84 0 01-1.06-.25z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0a0908] py-14" id="contact">
      <div className="section-shell">
        <Link className="display-serif inline-flex items-center gap-3 text-3xl tracking-[0.08em] text-background" href="/">
          <Image alt="" aria-hidden src="/sushi-king-logo.png" width={40} height={40} className="h-10 w-10" />
          {brandName}
        </Link>
        <p className="mt-4 max-w-sm text-sm leading-6 text-background/50">{t.footer.note}</p>

        <div className="mt-10">
          <p className="label-caps mb-4 text-background/35">Social</p>
          <div className="flex gap-3">
            <a
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-lg border border-background/15 text-background/55 transition-colors hover:border-background/35 hover:text-background"
              href="https://www.instagram.com/sushiking_portugal/"
              rel="noreferrer"
              target="_blank"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              aria-label="TikTok"
              className="grid h-11 w-11 place-items-center rounded-lg border border-background/15 text-background/55 transition-colors hover:border-background/35 hover:text-background"
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
