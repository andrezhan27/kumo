"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MagneticButton } from "@/components/MagneticButton";
import { useLanguage } from "@/components/LanguageProvider";
import { brandName, reservationHref } from "@/lib/content";

export function Navbar({ hideAtTop = false }: { hideAtTop?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { t, localizeHref } = useLanguage();
  const links = [
    { label: t.nav.menu, href: localizeHref("/menu") },
    { label: t.nav.pricing, href: localizeHref("/#pricing") },
    { label: t.nav.space, href: localizeHref("/#space") },
    { label: t.nav.contact, href: localizeHref("/#booking") },
  ];

  useEffect(() => {
    if (!hideAtTop) return;

    const updateScroll = () => {
      const pastTop = window.scrollY > 0;
      setScrolled(pastTop);
      if (!pastTop) setOpen(false);
    };
    const frame = requestAnimationFrame(updateScroll);
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
    };
  }, [hideAtTop]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); buttonRef.current?.focus(); }
    };
    const closeOutside = (event: Event) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("focusin", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <div aria-hidden="true" className={`fixed inset-x-0 top-16 bottom-0 z-40 touch-none bg-night/25 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-line/35 bg-background text-ink" data-at-top={hideAtTop && !scrolled && !open} ref={headerRef}>
        <nav aria-label={t.nav.label} className="section-shell relative flex h-16 items-center justify-between gap-3">
          <Link aria-label={`${brandName} — ${t.nav.home}`} className="flex shrink-0 items-center gap-2.5 text-lg font-normal tracking-[0.13em] text-gold" href={localizeHref("/#home")} onClick={() => setOpen(false)}>
            <Image alt="" aria-hidden src="/kumo-logo-gold.jpg" width={44} height={44} className="h-11 w-11 rounded-full object-cover brightness-125 mix-blend-lighten" />
            {brandName}
          </Link>
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
            {links.map(link => <a className="label-caps text-ink-muted transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep" href={link.href} key={link.href}>{link.label}</a>)}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <LanguageToggle />
            <div className="hidden lg:block"><MagneticButton className="min-w-36" href={reservationHref} size="compact">{t.nav.book}</MagneticButton></div>
            <button aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? t.nav.close : t.nav.toggle} className="relative grid h-10 w-10 place-items-center rounded-lg border border-line/70 bg-surface text-ink lg:hidden" onClick={() => setOpen(value => !value)} ref={buttonRef} type="button">
              <Menu aria-hidden className={`absolute h-5 w-5 transition-[transform,opacity] duration-300 ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
              <X aria-hidden className={`absolute h-5 w-5 transition-[transform,opacity] duration-300 ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} />
            </button>
          </div>
        </nav>
        <div aria-hidden={!open} className="mobile-navigation lg:hidden" data-open={open} id="mobile-navigation" inert={!open}>
          <div className="min-h-0 overflow-hidden">
            <nav aria-label={t.nav.label} className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line/35 bg-background">
              <div className="section-shell pt-5 pb-6">
                <p className="label-caps mb-2 text-gold-deep">{t.nav.explore}</p>
                {links.map((link, index) => <a className={`flex items-center justify-between border-b border-line/40 py-4 text-[1.35rem] font-medium tracking-tight text-ink transition-[transform,opacity,color] duration-300 hover:text-gold-deep ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`} href={link.href} key={link.href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${index * 35}ms` : "0ms" }}><span>{link.label}</span><ArrowUpRight aria-hidden className="h-4 w-4 text-ink-muted" strokeWidth={1.5} /></a>)}
                <a className="label-caps mt-6 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gold px-4 py-4 text-night" href={localizeHref(reservationHref)} onClick={() => setOpen(false)}><CalendarDays className="h-4 w-4" />{t.nav.book}</a>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
