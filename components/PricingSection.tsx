"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { pricingGroups } from "@/lib/content";

export function PricingSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-background py-section text-ink" id="pricing">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, margin: "-120px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="display-serif text-5xl leading-none md:text-7xl">
            {t.pricing.title}
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-5 md:mt-12"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.08, duration: 0.65 }}
          viewport={{ once: true, margin: "-120px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {t.pricing.groups.map((group, groupIndex) => {
            const sharedGroup = pricingGroups[groupIndex];

            return (
            <section
              className="rounded-md border border-line/60 bg-surface p-5 shadow-soft md:p-6"
              key={group.title}
            >
              <h3 className="text-lg font-semibold text-ink md:text-xl">
                {group.title}
              </h3>
              <div
                className={`mt-5 grid gap-3 ${
                  group.items.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"
                }`}
              >
                {group.items.map((item, itemIndex) => (
                  <article
                    className="flex min-h-20 items-center justify-between gap-4 rounded-md border border-line/45 bg-background px-4 py-4 md:min-h-24 md:px-5"
                    key={`${group.title}-${item.label}`}
                  >
                    <span className="max-w-[12rem] text-sm font-semibold leading-5 text-ink-muted md:text-base">
                      {item.label}
                    </span>
                    <span className="shrink-0 text-3xl font-bold tracking-normal text-gold-deep md:text-4xl">
                      {sharedGroup.items[itemIndex].price}
                    </span>
                  </article>
                ))}
              </div>
            </section>
            );
          })}
        </motion.div>

        <motion.p
          className="mt-8 text-sm leading-6 text-ink-muted md:text-base"
          initial={{ opacity: 0, y: 18 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          viewport={{ once: true, margin: "-120px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {t.pricing.note}
        </motion.p>
      </div>
    </section>
  );
}
