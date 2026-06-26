"use client";

import Image from "next/image";
import { Phone, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { restaurantInfo, takeawayItems } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

export function TakeawaySection() {
  const { t } = useLanguage();

  return (
    <section className="bg-background py-section text-ink" id="takeaway">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true, margin: "-120px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="display-serif whitespace-nowrap text-4xl leading-none sm:text-5xl md:text-7xl">
              {t.takeaway.title}
            </h2>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.08, duration: 0.6 }}
            viewport={{ once: true, margin: "-120px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <a
              className="label-caps inline-flex min-h-12 w-72 max-w-full items-center justify-center gap-3 whitespace-nowrap rounded-md border border-ink bg-ink px-5 text-background transition-colors hover:border-gold-deep hover:bg-gold hover:text-night focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              href={restaurantInfo.phoneHref}
            >
              <Phone className="h-4 w-4" />
              {t.takeaway.phoneCta}
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.12, duration: 0.65 }}
          viewport={{ once: true, margin: "-120px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {takeawayItems.map((item, index) => {
            const translatedItem = t.takeaway.items[index];

            return (
              <article
                className="group overflow-hidden rounded-md border border-line/60 bg-night shadow-soft transition-colors hover:border-gold-deep/45"
                key={item.id}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <Image
                    alt={`${translatedItem.name} ${t.takeaway.priceLabel.toLowerCase()} ${item.price}`}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
                    src={item.image}
                  />
                </div>

                <div className="grid min-h-36 gap-5 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold leading-7 text-background">
                        {translatedItem.name}
                      </h3>
                      <p className="label-caps mt-2 flex items-center gap-2 text-background/58">
                        <ShoppingBag className="h-4 w-4 text-gold" />
                        {t.takeaway.readyLabel}
                      </p>
                    </div>
                    <p className="shrink-0 text-3xl font-bold leading-none text-gold">
                      {item.price}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
