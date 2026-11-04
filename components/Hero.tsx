"use client";

import Link from "next/link";
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
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-night pt-16 text-background" id="home">
      <div className="absolute inset-x-0 top-16 bottom-0 md:top-0">
        <picture className="absolute inset-0">
          <source media="(max-width: 767px)" sizes={mobileImage.sizes} srcSet={mobileImage.srcSet} />
          <Image alt={t.hero.imageAlt} className="object-cover object-center md:object-[48%_50%]" fetchPriority="high" fill loading="eager" sizes="100vw" src="/hero/kumo-hero-desktop.webp" />
        </picture>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,0.08),rgba(8,7,6,0.12)_28%,rgba(8,7,6,0.62)_58%,rgba(8,7,6,0.94))] md:bg-[linear-gradient(0deg,rgba(8,7,6,0.72),rgba(8,7,6,0.46)_50%,rgba(8,7,6,0.36))]" />
      <div className="section-shell relative z-10 grid min-h-[calc(100svh-4rem)] items-center py-10 md:pt-12 md:pb-16">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="label-caps mb-4 text-background/70 md:mb-7">{t.hero.eyebrow}</p>
          <h1 className="display-heading text-[clamp(3.5rem,10vw,8rem)] leading-none text-background">{t.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-background/75 sm:max-w-md sm:text-base md:mt-7 md:text-background/65">{t.hero.description}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap md:mt-9">
            <MagneticButton className="min-w-56 whitespace-nowrap shadow-[0_0_32px_rgb(254_214_91/0.18)]" href={reservationHref}>{t.hero.primary}</MagneticButton>
            <Link className="label-caps inline-flex min-h-12 min-w-56 items-center justify-center whitespace-nowrap rounded-lg border border-background/60 px-7 py-4 text-background transition-colors hover:bg-background/10" href={localizeHref("/menu")}>{t.menuSection.cta}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
