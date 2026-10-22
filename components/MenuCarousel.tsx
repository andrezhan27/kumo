"use client";

import Image from "next/image";
import { menuItems } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

const galleryRows = [
  [{ index: 0, frame: "md:w-88 md:aspect-[4/5]" }, { index: 1, frame: "md:w-128 md:aspect-[16/11]" }, { index: 2, frame: "md:w-80 md:aspect-square" }],
  [{ index: 3, frame: "md:w-84 md:aspect-[3/4]" }, { index: 4, frame: "md:w-136 md:aspect-[5/3]" }, { index: 5, frame: "md:w-76 md:aspect-[5/6]" }],
];

export function MenuCarousel() {
  const { t } = useLanguage();
  return (
    <section className="bg-surface py-section" id="menu-section">
      <div className="section-shell overflow-hidden">
        <div className="mx-auto grid max-w-3xl justify-items-center gap-6 text-center">
          <h2 className="display-heading text-5xl leading-none text-ink md:text-7xl">{t.menuSection.title}</h2>
          <p className="max-w-xl text-lg leading-8 text-ink-muted">{t.menuSection.description}</p>
        </div>
        <div aria-label={t.menuSection.galleryLabel} className="menu-marquee relative mt-8 overflow-hidden py-1 md:mt-12" role="region" tabIndex={0}>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-gradient-to-r from-surface to-transparent md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-gradient-to-l from-surface to-transparent md:w-20" />
          <div className="menu-marquee-track flex w-max">
            {[0, 1].map(setIndex => <div aria-hidden={setIndex === 1} className="grid shrink-0 grid-rows-2 gap-3 pr-3 md:gap-4 md:pr-4" key={setIndex}>
              {galleryRows.map((row, rowIndex) => <div className="flex gap-3 md:gap-4" key={rowIndex}>
                {row.map(({ index, frame }) => <div className={`group relative h-32 w-[52vw] shrink-0 overflow-hidden rounded-lg bg-surface-strong sm:h-40 sm:w-64 md:h-auto ${frame}`} key={menuItems[index].id}>
                  <Image alt={setIndex === 1 ? "" : t.menuSection.imageAlts[index]} className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" fill sizes="(min-width: 768px) 544px, (min-width: 640px) 256px, 52vw" src={menuItems[index].image} />
                </div>)}
              </div>)}
            </div>)}
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-6 text-ink-muted">{t.menuSection.note}</p>
      </div>
    </section>
  );
}
