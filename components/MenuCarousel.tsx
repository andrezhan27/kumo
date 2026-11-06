"use client";

import Image from "next/image";
import { MagneticButton } from "@/components/MagneticButton";
import { useContinuousScroll } from "@/components/useContinuousScroll";
import { menuItems } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";
import { CloudOrnament } from "@/components/CloudOrnament";

export function MenuCarousel() {
  const { t } = useLanguage();
  const viewportRef = useContinuousScroll();

  return (
    <section className="cloud-accent-section section-charcoal bg-background py-section" id="menu-section">
      <CloudOrnament className="cloud-ornament--menu-preview" />
      <div className="section-shell overflow-hidden">
        <div className="mx-auto grid max-w-3xl justify-items-center gap-6 text-center">
          <h2 className="display-heading text-5xl leading-none text-gold md:text-7xl">{t.menuSection.title}</h2>
          <p className="max-w-xl text-lg leading-8 text-ink-muted">{t.menuSection.description}</p>
        </div>
        <div className="relative mt-8 md:mt-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-gradient-to-r from-background to-transparent md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-gradient-to-l from-background to-transparent md:w-20" />
          <div aria-label={t.menuSection.galleryLabel} className="menu-marquee overflow-x-auto py-1" ref={viewportRef} role="region" tabIndex={0}>
            <div className="menu-marquee-track flex w-max">
              {/* Matching sets keep the single row seamless in either direction. */}
              {[0, 1, 2].map(setIndex => (
                <div aria-hidden={setIndex !== 0} data-marquee-set="" className="menu-marquee-set flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4" key={setIndex}>
                  {menuItems.map((item, index) => (
                    <div className="group relative aspect-[4/3] w-[68vw] max-w-72 shrink-0 overflow-hidden rounded-lg bg-night sm:w-72 sm:max-w-none md:w-80 lg:w-96" key={item.id}>
                      <Image alt={setIndex !== 0 ? "" : t.menuSection.imageAlts[index]} className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" fill sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, (min-width: 424px) 288px, 68vw" src={item.image} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <MagneticButton href="/menu">{t.menuSection.cta}</MagneticButton>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-ink-muted">{t.menuSection.note}</p>
      </div>
    </section>
  );
}
