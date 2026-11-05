"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { childrenMenu, diningPrices, restaurantInfo } from "@/lib/content";

const priceLocales = { fr: "fr-BE", en: "en-GB", nl: "nl-BE" } as const;

export function PricingSection() {
  const { t, language } = useLanguage();
  const copy = t.pricing;
  const formatPrice = (value: number) => new Intl.NumberFormat(priceLocales[language], {
    style: "currency", currency: "EUR", minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);

  return (
    <section aria-labelledby="pricing-heading" className="section-warm bg-background py-section text-ink lg:py-20" id="pricing">
      <div className="section-shell lg:max-w-4xl">
        <h2 className="display-heading text-5xl leading-none text-gold md:text-7xl lg:text-5xl" id="pricing-heading">{copy.title}</h2>
        <p className="mt-5 text-base leading-7 text-ink-muted">{copy.description}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {diningPrices.map(prices => {
            const formula = copy.formulas[prices.id];
            return (
              <article aria-labelledby={`price-${prices.id}`} className="flex flex-col rounded-lg border border-line/70 bg-surface p-5 sm:p-6" key={prices.id}>
                <h3 className="text-xl font-medium tracking-tight text-gold" id={`price-${prices.id}`}>{formula.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{formula.detail}</p>
                <dl className="mt-5 divide-y divide-line/50 border-y border-line/50">
                  <div className="flex items-center justify-between gap-3 py-4">
                    <dt className="text-sm">{copy.adult}</dt>
                    <dd className="shrink-0 text-3xl font-medium tracking-tight">{formatPrice(prices.adult)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-4">
                    <dt className="text-sm text-gold">{copy.children}<span className="mt-1 block text-xs text-ink-muted">{childrenMenu.minAge}–{childrenMenu.maxAge} {copy.ageUnit}</span></dt>
                    <dd className="shrink-0 text-2xl font-medium tracking-tight text-gold">{formatPrice(prices.child)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-ink-muted">{copy.perPerson}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs leading-6 text-ink-muted sm:text-sm">
          <p>{copy.lunch} · {restaurantInfo.hours.lunch}</p>
          <p>{copy.dinner} · {restaurantInfo.hours.dinner}</p>
        </div>
        <p className="mt-4 text-sm font-semibold text-gold">{copy.exclusions}</p>
        <p className="mt-2 max-w-2xl text-xs leading-6 text-ink-muted sm:text-sm">{copy.note}</p>
      </div>
    </section>
  );
}
