"use client";

import Image from "next/image";
import { MagneticButton } from "@/components/MagneticButton";
import { useLanguage } from "@/components/LanguageProvider";
import { reservationHref } from "@/lib/content";

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-night pt-16 text-background" id="home">
      <div className="absolute inset-x-0 top-16 bottom-0 md:top-0">
        <Image alt={t.hero.imageAlt} className="object-cover object-[43%_top] md:object-[48%_50%]" fill preload sizes="(max-width: 767px) 134vh, 100vw" src="/hero/kumo-exterior.webp" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,0.08),rgba(8,7,6,0.12)_28%,rgba(8,7,6,0.62)_58%,rgba(8,7,6,0.94))] md:bg-[linear-gradient(0deg,rgba(8,7,6,0.72),rgba(8,7,6,0.46)_50%,rgba(8,7,6,0.36))]" />
      <div className="section-shell relative z-10 grid min-h-[calc(100svh-4rem)] items-end pt-12 pb-8 md:items-center md:pb-16">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="label-caps mb-4 text-background/70 md:mb-7">{t.hero.eyebrow}</p>
          <h1 className="display-heading text-[clamp(3.5rem,10vw,8rem)] leading-none text-background">{t.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-background/75 sm:max-w-md sm:text-base md:mt-7 md:text-background/65">{t.hero.description}</p>
          <div className="mt-6 flex items-center justify-center md:mt-9">
            <MagneticButton className="min-w-56 whitespace-nowrap shadow-[0_0_32px_rgb(254_214_91/0.18)]" href={reservationHref}>{t.hero.primary}</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
