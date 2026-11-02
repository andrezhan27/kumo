"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export function RestaurantStory() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="story-heading" className="bg-background py-16 md:py-24" id="our-story">
      <div className="section-shell grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div>
          <p className="label-caps text-gold-deep">{t.story.eyebrow}</p>
          <h2 className="display-heading mt-5 max-w-xl text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl" id="story-heading">{t.story.title}</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-ink-muted">{t.story.description}</p>
          <p className="mt-4 max-w-xl text-base leading-8 text-ink-muted">{t.story.welcome}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-strong">
          <Image alt={t.story.imageAlt} className="object-cover" fill sizes="(min-width: 1600px) 672px, (min-width: 768px) 44vw, 92vw" src="/space/space-06.webp" />
        </div>
      </div>
    </section>
  );
}
