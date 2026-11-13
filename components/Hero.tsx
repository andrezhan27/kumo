"use client";

import { CloudOrnament } from "@/components/CloudOrnament";
import { MagneticButton } from "@/components/MagneticButton";
import { useLanguage } from "@/components/LanguageProvider";
import { reservationHref } from "@/lib/content";

export function Hero() {
  const { t, localizeHref } = useLanguage();
  return (
    <section className="hero relative flex min-h-[100svh] items-center overflow-hidden bg-night pt-16 text-ink" id="home">
      <CloudOrnament className="cloud-ornament--hero-top" />
      <CloudOrnament className="cloud-ornament--hero-bottom" />
      <div className="section-shell relative z-10 grid min-h-[calc(100svh-4rem)] items-center py-10 md:pt-12 md:pb-16">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="label-caps mb-4 text-ink/90 md:mb-7">{t.hero.eyebrow}</p>
          <h1 className="hero-title text-[clamp(2.75rem,10vw,8rem)] leading-none text-white">{t.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-ink/90 sm:max-w-md sm:text-base md:mt-7 md:text-ink/85">{t.hero.description}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap md:mt-9">
            <MagneticButton className="min-w-56 whitespace-nowrap shadow-[0_0_32px_rgb(220_169_89/0.18)]" href={reservationHref}>{t.hero.primary}</MagneticButton>
            <a className="label-caps inline-flex min-h-12 min-w-56 items-center justify-center whitespace-nowrap rounded-lg border border-gold/70 px-7 py-4 text-gold transition-colors hover:bg-gold/10" href={localizeHref("/menu")}>{t.menuSection.cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
