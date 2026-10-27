"use client";

import Image from "next/image";
import { spaceSlides } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

export function SpaceCarousel() {
  const { t } = useLanguage();

  return (
    <section className="bg-background py-section text-ink" id="space">
      <div className="section-shell">
        <h2 className="display-heading max-w-3xl text-5xl leading-none md:text-7xl">{t.space.title}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">{t.space.description}</p>
        <div aria-label={t.space.title} className="space-mosaic mt-8 md:mt-12" role="region">
          {spaceSlides.map((item, index) => (
            <figure className="space-mosaic-tile group relative min-w-0 overflow-hidden bg-surface-strong" key={item.id}>
              <Image alt={t.space.imageAlts[index]} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]" fill sizes={index < 3 ? "(min-width: 1600px) 480px, (min-width: 768px) 31vw, 46vw" : `(min-width: 1600px) 720px, (min-width: 768px) 46vw, ${index === 5 ? "92vw" : "46vw"}`} src={item.image} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
