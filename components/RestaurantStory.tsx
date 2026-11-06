"use client";

import Image from "next/image";
import { CookingPot, Repeat2, Tablet, Utensils } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { CloudOrnament } from "@/components/CloudOrnament";

const stepIcons = [Tablet, CookingPot, Utensils, Repeat2];

export function RestaurantStory() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="story-heading" className="cloud-accent-section bg-background py-16 md:py-24" id="our-story">
      <CloudOrnament className="cloud-ornament--about" />
      <div className="section-shell grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div>
          <p className="brand-eyebrow label-caps text-gold-deep">{t.story.eyebrow}</p>
          <h2 className="display-heading mt-5 max-w-xl text-4xl leading-[1.1] text-gold sm:text-5xl lg:text-6xl" id="story-heading">{t.story.title}</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-ink-muted">{t.story.description}</p>
          <ol className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4">
            {t.story.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return <li className="border-t border-line/60 pt-4" key={step}>
                <Icon aria-hidden="true" className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <p className="mt-3 text-xs leading-5 text-ink-muted"><span className="mr-1 text-gold">{index + 1}.</span> {step}</p>
              </li>;
            })}
          </ol>
        </div>
        <div className="story-photo relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-strong">
          <Image alt={t.story.imageAlt} className="object-cover" fill sizes="(min-width: 1600px) 672px, (min-width: 768px) 44vw, 92vw" src="/space/space-06.webp" />
        </div>
      </div>
    </section>
  );
}
