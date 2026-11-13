"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { reservationHref } from "@/lib/content";
import logo from "@/public/kumo-logo-gold.jpg";
import cloud from "@/public/ornaments/kumo-cloud-hero-detailed.webp";

const cloudPositions = ["left", "right", "center", "lower-left", "lower-right"];

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero relative flex min-h-[100svh] items-center overflow-hidden bg-night pt-16 text-ink" id="home">
      <div aria-hidden="true" className="hero-clouds">
        {cloudPositions.map(position => (
          <Image
            alt=""
            className={`hero-cloud hero-cloud--${position}`}
            key={position}
            loading="eager"
            sizes="(min-width: 768px) min(42vw, 49rem, 68svh), 72vw"
            src={cloud}
          />
        ))}
      </div>
      <div className="hero-shell section-shell relative z-10 min-h-[calc(100svh-4rem)]">
        <div className="hero-content mx-auto w-full max-w-4xl text-center">
          <h1>
            <Image alt={t.hero.title} className="hero-logo mx-auto" fetchPriority="high" loading="eager" sizes="min(49vw, 30svh, 16rem)" src={logo} />
          </h1>
          <p className="hero-tagline mt-6 text-ink sm:mt-8">{t.hero.description}</p>
          <a className="hero-action mt-5 md:mt-6" href={reservationHref}>{t.hero.primary}</a>
        </div>
      </div>
    </section>
  );
}
