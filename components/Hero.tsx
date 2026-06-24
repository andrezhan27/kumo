"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { useLanguage } from "@/components/LanguageProvider";
import { reservationPhoneHref } from "@/lib/content";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.42]);
  const { t } = useLanguage();

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-night px-edge pt-20 text-background"
      id="home"
      ref={ref}
    >
      <motion.div className="absolute inset-0" style={{ opacity, y }}>
        <Image
          alt="Premium sashimi selection arranged over ice with oyster and herbs"
          className="object-cover object-center opacity-70 md:hidden"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 0vw"
          src="/hero/hero-mobile.webp"
        />
        <Image
          alt="Premium sashimi selection arranged over ice with oyster and herbs"
          className="hidden object-cover object-center opacity-70 md:block"
          fill
          priority
          sizes="(min-width: 768px) 100vw, 0vw"
          src="/hero/hero-desktop.webp"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,0.88),rgba(8,7,6,0.56)_44%,rgba(8,7,6,0.18)),linear-gradient(0deg,rgba(8,7,6,0.92),transparent_48%)]" />

      <div className="section-shell relative z-10 grid min-h-[calc(100svh-5rem)] items-center pb-16 pt-12">
        <div className="mx-auto max-w-4xl text-center md:mx-0 md:text-left">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="display-serif max-w-4xl text-[clamp(3.4rem,9vw,8rem)] leading-[0.92] text-background"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.09, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-background/82 md:mx-0 md:text-xl"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.description}
          </motion.p>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.27, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton
              className="w-48 whitespace-nowrap shadow-[0_0_32px_rgb(254_214_91/0.18)]"
              href={reservationPhoneHref}
            >
              {t.hero.primary}
            </MagneticButton>
            <a
              className="label-caps inline-flex w-48 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-background/35 px-7 py-4 text-background transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              href="/menu"
            >
              {t.hero.secondary}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.a
          animate={{ opacity: 1 }}
          className="label-caps absolute bottom-8 left-0 hidden items-center gap-3 text-background/72 md:flex"
          href="#menu-section"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span>{t.hero.scroll}</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
