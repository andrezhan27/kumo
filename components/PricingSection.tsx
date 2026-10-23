"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { restaurantInfo } from "@/lib/content";

export function PricingSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-background py-section text-ink lg:py-20" id="pricing">
      <div className="section-shell lg:max-w-4xl">
        <h2 className="display-heading text-5xl leading-none md:text-7xl lg:text-5xl">{t.pricing.title}</h2>
        <table className="pricing-table mt-10 w-full table-fixed border-collapse text-left md:mt-14 lg:mt-8">
          <caption className="sr-only">{t.pricing.title}. {t.pricing.placeholder}. {t.pricing.note}</caption>
          <colgroup><col className="w-[44%] sm:w-1/2" /><col /><col /></colgroup>
          <thead>
            <tr className="border-y border-line/70">
              <td><span className="sr-only">{t.pricing.placeholder}</span></td>
              {[{ title: t.pricing.lunch.title, hours: restaurantInfo.hours.lunch }, { title: t.pricing.dinner.title, hours: restaurantInfo.hours.dinner }].map(option => (
                <th className="border-l border-line/50 px-2 py-5 text-center font-medium sm:px-5 sm:py-7 lg:py-4" key={option.title} scope="col">
                  <span className="block text-xs tracking-[0.08em] uppercase sm:text-xl md:text-2xl lg:text-sm">{option.title}</span>
                  <span className="mt-2 block text-[10px] font-normal whitespace-nowrap text-ink-muted sm:text-xs">{option.hours}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.pricing.categories.map(category => (
              <tr className="border-b border-line/70" key={category.title}>
                <th className="py-7 pr-3 font-medium sm:py-10 sm:pr-6 lg:py-6" scope="row">
                  <span className="block text-sm leading-6 sm:text-lg md:text-xl lg:text-base">{category.title}</span>
                  <span className="mt-1.5 block text-[11px] leading-5 font-normal text-ink-muted sm:text-sm lg:text-xs">{category.detail}</span>
                </th>
                {["lunch", "dinner"].map(meal => (
                  <td className="border-l border-line/50 px-1 py-7 text-center sm:px-5 sm:py-10 lg:py-6" key={meal}>
                    <span aria-label={t.pricing.placeholder} className="block text-2xl leading-none font-medium tracking-tight whitespace-nowrap sm:text-4xl md:text-5xl lg:text-3xl">— €</span>
                    <span className="mt-3 block text-[10px] leading-4 text-ink-muted sm:text-sm lg:mt-2 lg:text-xs">{t.pricing.perPerson}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 max-w-2xl text-xs leading-6 text-ink-muted sm:text-sm lg:mt-4 lg:text-xs">{t.pricing.note}</p>
      </div>
    </section>
  );
}
