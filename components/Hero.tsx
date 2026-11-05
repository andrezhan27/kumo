"use client";

import Image, { getImageProps } from "next/image";
import { MagneticButton } from "@/components/MagneticButton";
import { useLanguage } from "@/components/LanguageProvider";
import { reservationHref } from "@/lib/content";
import mobileHero from "@/public/hero/kumo-hero-mobile.webp";

export function Hero() {
  const { t, localizeHref } = useLanguage();
  const { props: mobileImage } = getImageProps({
    alt: t.hero.imageAlt,
    src: mobileHero,
    fill: true,
    sizes: "100vw",
  });
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-night pt-16 text-ink" id="home">
      <div className="absolute inset-x-0 top-16 bottom-0 md:top-0">
        <picture className="absolute inset-0">
          <source media="(max-width: 767px)" sizes={mobileImage.sizes} srcSet={mobileImage.srcSet} />
          <Image alt={t.hero.imageAlt} className="object-cover object-center md:object-[48%_50%]" fetchPriority="high" fill loading="eager" sizes="100vw" src="/hero/kumo-hero-desktop.webp" />
        </picture>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(28,27,27,0.76),rgba(28,27,27,0.54)_50%,rgba(28,27,27,0.44))]" />
      <div className="section-shell relative z-10 grid min-h-[calc(100svh-4rem)] items-center py-10 md:pt-12 md:pb-16">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="label-caps mb-4 text-ink/90 md:mb-7">{t.hero.eyebrow}</p>
          <h1 className="display-heading text-[clamp(3.5rem,10vw,8rem)] leading-none text-white">{t.hero.title}</h1>
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
