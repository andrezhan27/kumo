"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { spaceSlides } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

export function SpaceCarousel() {
  const { t } = useLanguage();
  const galleryRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function updateActive() {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const first = gallery.firstElementChild as HTMLElement | null;
    if (!first) return;
    const gap = parseFloat(getComputedStyle(gallery).columnGap) || 0;
    const step = first.getBoundingClientRect().width + gap;
    setActive(Math.max(0, Math.min(spaceSlides.length - 1, Math.round(gallery.scrollLeft / step))));
  }

  function showPhoto(index: number) {
    const gallery = galleryRef.current;
    const photo = gallery?.children[index] as HTMLElement | undefined;
    if (!gallery || !photo) return;
    gallery.scrollTo({
      left: photo.offsetLeft - (gallery.firstElementChild as HTMLElement).offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  return (
    <section className="bg-background py-section text-ink" id="space">
      <div className="section-shell">
        <h2 className="display-heading max-w-3xl text-5xl leading-none md:text-7xl">{t.space.title}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">{t.space.description}</p>
        <div aria-label={t.space.title} className="space-gallery mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 md:mt-12 md:grid md:snap-none md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0" onScroll={updateActive} ref={galleryRef} role="region" tabIndex={0}>
          {spaceSlides.map((item, index) => <figure className="w-[92%] min-w-0 shrink-0 snap-start md:w-auto" key={item.id}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-strong">
              <Image alt={t.space.imageAlts[index]} className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" fill sizes="(min-width: 1600px) 470px, (min-width: 768px) 30vw, 85vw" src={item.image} />
            </div>
            <figcaption className="mt-4 text-sm font-medium tracking-tight text-ink-muted md:hidden">{t.space.labels[index]}</figcaption>
          </figure>)}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-line/50 pt-4 md:hidden">
          <p aria-atomic="true" aria-live="polite" className="label-caps tabular-nums text-ink-muted"><span className="text-ink">{String(active + 1).padStart(2, "0")}</span><span aria-hidden className="mx-3 text-line">/</span><span>{String(spaceSlides.length).padStart(2, "0")}</span></p>
          <div className="flex gap-2">
            <button aria-label={t.space.previous} className="grid h-10 w-10 place-items-center rounded-lg border border-line/70 bg-background transition-colors hover:border-gold-deep disabled:cursor-default disabled:opacity-30" disabled={active === 0} onClick={() => showPhoto(active - 1)} type="button"><ArrowLeft aria-hidden className="h-4 w-4" /></button>
            <button aria-label={t.space.next} className="grid h-10 w-10 place-items-center rounded-lg border border-line/70 bg-background transition-colors hover:border-gold-deep disabled:cursor-default disabled:opacity-30" disabled={active === spaceSlides.length - 1} onClick={() => showPhoto(active + 1)} type="button"><ArrowRight aria-hidden className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
