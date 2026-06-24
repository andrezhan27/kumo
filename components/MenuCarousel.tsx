"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { menuItems } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

const galleryRows = [
  [
    { item: menuItems[0], frame: "w-[68vw] aspect-[4/5] sm:w-[20rem] md:w-[22rem]" },
    { item: menuItems[1], frame: "w-[76vw] aspect-[16/11] sm:w-[30rem] md:w-[32rem]" },
    { item: menuItems[2], frame: "w-[64vw] aspect-square sm:w-[24rem] md:w-[20rem]" },
  ],
  [
    { item: menuItems[3], frame: "w-[70vw] aspect-[3/4] sm:w-[21rem] md:w-[21rem]" },
    { item: menuItems[4], frame: "w-[74vw] aspect-[5/3] sm:w-[32rem] md:w-[34rem]" },
    { item: menuItems[5], frame: "w-[64vw] aspect-[5/6] sm:w-[21rem] md:w-[19rem]" },
  ],
];

export function MenuCarousel() {
  const { t } = useLanguage();

  return (
    <section className="bg-surface py-section" id="menu-section">
      <div className="section-shell overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true, margin: "-120px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="display-serif max-w-2xl text-5xl leading-none text-ink md:text-7xl">
              {t.menuSection.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-muted">
              {t.menuSection.description}
            </p>
            <div className="mt-8 flex items-center">
              <Link
                className="label-caps inline-flex items-center gap-2 text-ink transition-colors hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                href="/menu"
              >
                {t.menuSection.viewFull}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="menu-marquee relative -mx-edge overflow-hidden py-1 lg:-mr-edge lg:ml-0"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.08, duration: 0.65 }}
            viewport={{ once: true, margin: "-120px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-surface to-transparent md:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-surface to-transparent md:w-24" />
            <div className="menu-marquee-track flex w-max">
              {[0, 1].map((setIndex) => (
                <div
                  aria-hidden={setIndex === 1}
                  className="grid shrink-0 grid-rows-2 gap-3 pr-3 md:gap-4 md:pr-4"
                  key={setIndex}
                >
                  {galleryRows.map((row, rowIndex) => (
                    <div className="flex gap-3 md:gap-4" key={rowIndex}>
                      {row.map(({ item, frame }) => (
                        <article
                          className={`group relative shrink-0 overflow-hidden rounded-md bg-surface-strong shadow-[0_18px_54px_rgb(28_27_27/0.14)] ${frame}`}
                          key={`${setIndex}-${item.id}`}
                        >
                          <Image
                            alt={item.alt}
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                            fill
                            sizes="(min-width: 1024px) 34rem, (min-width: 640px) 32rem, 76vw"
                            src={item.image}
                          />
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
