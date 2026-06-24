"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { spaceSlides } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

const galleryLayout = [
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-6",
  "md:col-span-6",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-6",
] as const;

const imageFrames = [
  "aspect-[16/10] md:aspect-[4/3]",
  "aspect-[4/5] md:aspect-[4/3]",
  "aspect-square md:aspect-[4/3]",
  "aspect-square md:aspect-[4/3]",
  "aspect-[4/5] md:aspect-[4/3]",
  "aspect-[5/6] md:aspect-[2/3]",
  "aspect-[5/6] md:aspect-[2/3]",
  "aspect-[16/10] md:aspect-[4/3]",
] as const;

export function SpaceCarousel() {
  const { t } = useLanguage();

  return (
    <section className="bg-background py-section text-ink" id="space">
      <div className="section-shell @container">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, margin: "-120px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="display-serif max-w-3xl text-5xl leading-none md:text-7xl">
            {t.space.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
            {t.space.description}
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.08, duration: 0.65 }}
          viewport={{ once: true, margin: "-120px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Mobile: explicit two-column masonry */}
          <div className="flex gap-1.5 md:hidden">
            {[0, 1].map((colIdx) => (
              <div className="flex flex-1 flex-col gap-1.5" key={colIdx}>
                {spaceSlides
                  .filter((_, i) => i % 2 === colIdx)
                  .map((item, rowIdx) => {
                    const index = rowIdx * 2 + colIdx;
                    return (
                      <figure key={item.id}>
                        <div
                          className={`group relative overflow-hidden rounded-md bg-surface-strong ${imageFrames[index]}`}
                        >
                          <Image
                            alt={item.alt}
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                            fill
                            sizes="50vw"
                            src={item.image}
                          />
                        </div>
                      </figure>
                    );
                  })}
              </div>
            ))}
          </div>

          {/* Desktop: grid layout */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-1">
            {spaceSlides.map((item, index) => (
              <figure
                className={`${galleryLayout[index]}`}
                key={item.id}
              >
                <div
                  className={`group relative ${imageFrames[index]} overflow-hidden bg-surface-strong md:rounded-none`}
                >
                  <Image
                    alt={item.alt}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    fill
                    sizes={
                      index === 0
                        ? "(min-width: 1024px) 52vw, 100vw"
                        : "(min-width: 1024px) 42vw, 100vw"
                    }
                    src={item.image}
                  />
                </div>
              </figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
