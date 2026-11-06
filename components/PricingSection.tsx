"use client";

import { HowItWorks } from "@/components/HowItWorks";
import { CloudOrnament } from "@/components/CloudOrnament";
import { useLanguage } from "@/components/LanguageProvider";
import { childrenMenu, diningFormulas, diningPrices, restaurantInfo } from "@/lib/content";

const priceLocales = { fr: "fr-BE", en: "en-GB", nl: "nl-BE" } as const;

// Background colors sampled from the corresponding cards in the owner's brochure photo.
const pricingCardColors = {
  weekdayLunch: "#dedccf",
  saturdayLunch: "#dbd0b4",
  weekdayDinner: "#efd6ae",
  weekendHolidays: "#d7bdac",
} as const;

export function PricingSection() {
  const { t, language } = useLanguage();
  const copy = t.pricing;
  const formatPrice = (value: number) => new Intl.NumberFormat(priceLocales[language], {
    style: "currency", currency: "EUR", minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);

  return (
    <section aria-labelledby="pricing-heading" className="cloud-accent-section section-warm bg-background py-16 text-ink md:py-20" id="pricing">
      <CloudOrnament className="cloud-ornament--pricing" />
      <div className="section-shell max-w-5xl">
        <p className="brand-eyebrow label-caps text-gold">{t.howItWorks.eyebrow}</p>
        <h2 className="display-heading mt-4 text-4xl leading-[1.1] text-gold sm:text-5xl lg:text-6xl" id="pricing-heading">{copy.title}</h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ink-muted">{copy.description}</p>
        <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5">
          {diningPrices.map(prices => {
            const formula = copy.formulas[prices.id];
            const rules = diningFormulas[prices.formula === "lunch" ? 0 : 1];
            const isWeekend = prices.id === "weekendHolidays";
            const childWait = prices.formula === "lunch" ? childrenMenu.lunchWaitMinutes : childrenMenu.dinnerWaitMinutes;
            return (
              <article aria-labelledby={`price-${prices.id}`} className="pricing-card flex min-w-0 flex-col rounded-lg border border-line/30 p-5 sm:p-6" key={prices.id} style={{ backgroundColor: pricingCardColors[prices.id] }}>
                <h3 className="text-xl font-medium tracking-tight text-gold" id={`price-${prices.id}`}>{formula.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{formula.detail}</p>
                <dl className="mt-5" data-prices>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-sm">{copy.adult}<span className="mt-1 block text-xs text-ink-muted">{copy.perPerson}</span></dt>
                    <dd className="shrink-0 text-4xl font-medium tracking-tight text-gold">{formatPrice(prices.adult)}</dd>
                  </div>
                </dl>
                <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line/50 py-4" data-adult-rules>
                  {[
                    { label: copy.orders, value: rules.orders },
                    { label: copy.dishes, value: rules.dishesPerOrder },
                    { label: copy.wait, value: `${rules.waitMinutes} min${isWeekend ? '*' : ''}` },
                  ].map(rule => <div className="flex flex-col-reverse justify-end gap-2" key={rule.label}>
                    <dt className="text-[11px] leading-5 text-ink-muted sm:text-xs">{rule.label}</dt>
                    <dd className="text-xl font-medium tracking-tight sm:text-2xl">{rule.value}</dd>
                  </div>)}
                </dl>
                {isWeekend && <p className="mt-3 text-xs leading-5 text-ink-muted">* {copy.weekendWait}</p>}
                <div className="mt-5 border-t border-line/50 pt-4">
                  <dl data-prices>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-sm text-gold">{copy.children}<span className="mt-1 block text-xs text-ink-muted">{childrenMenu.minAge}–{childrenMenu.maxAge} {copy.ageUnit} · {copy.perPerson}</span></dt>
                      <dd className="shrink-0 text-2xl font-medium tracking-tight text-gold">{formatPrice(prices.child)}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-xs leading-6 text-ink-muted">{childrenMenu.orders} {t.howItWorks.childrenOrders} · {childrenMenu.dishesPerOrder} {t.howItWorks.childrenDishes}</p>
                  <p className="text-xs leading-6 text-ink-muted">{childWait} min · {copy.wait}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs leading-6 text-ink-muted sm:text-sm">
          <p>{copy.lunch} · {restaurantInfo.hours.lunch}</p>
          <p>{copy.sundayLunch} · {restaurantInfo.hours.sundayLunch}</p>
          <p>{copy.dinner} · {restaurantInfo.hours.dinner}</p>
        </div>
        <p className="mt-4 text-sm font-semibold text-gold">{copy.exclusions}</p>
        <p className="mt-2 max-w-3xl text-xs leading-6 text-ink-muted sm:text-sm">{copy.note}</p>
        <HowItWorks />
      </div>
    </section>
  );
}
