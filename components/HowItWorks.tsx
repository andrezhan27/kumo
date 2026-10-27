"use client";

import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { diningFormulas, diningSlogan } from "@/lib/content";

export function HowItWorks() {
  const { t } = useLanguage();
  const copy = t.howItWorks;

  return (
    <section aria-labelledby="how-it-works-heading" className="border-b border-line/50 bg-background py-12 sm:py-16 lg:py-20" id="how-it-works">
      <div className="section-shell max-w-6xl">
        <p className="label-caps text-gold-deep">{copy.eyebrow}</p>
        <h2 className="display-heading mt-3 text-3xl leading-[1.1] sm:text-4xl lg:text-5xl" id="how-it-works-heading">{copy.title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-ink-muted sm:text-base sm:leading-7">{copy.description}</p>

        <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <div className="rounded-lg border border-line/60 bg-surface px-4 py-3 sm:px-5 sm:py-4">
              <table className="w-full table-fixed border-collapse text-sm leading-5">
                <caption className="pb-3 text-left text-xs leading-5 text-ink-muted">{copy.comparisonLabel} · {copy.perPerson}</caption>
                <colgroup><col className="w-[44%]" /><col /><col /></colgroup>
                <thead>
                  <tr className="border-b border-line/60">
                    <td><span className="sr-only">{copy.formulaLabel}</span></td>
                    {diningFormulas.map(formula => <th className="pb-3 text-center text-xs font-semibold text-gold-deep" key={formula.id} scope="col">{copy.meals[formula.id]}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-line/50">
                    <th className="py-3 pr-2 text-left text-xs font-normal text-ink-muted" scope="row">{copy.dishes}</th>
                    {diningFormulas.map(formula => <td className="py-3 text-center text-2xl font-medium tracking-tight sm:text-3xl" key={formula.id}>{formula.dishes}</td>)}
                  </tr>
                  <tr className="border-b border-line/50">
                    <th className="py-3 pr-2 text-left text-xs font-normal text-ink-muted" scope="row">{copy.orders}</th>
                    {diningFormulas.map(formula => <td className="py-3 text-center font-semibold" key={formula.id}>{formula.orders}</td>)}
                  </tr>
                  <tr>
                    <th className="py-3 pr-2 text-left text-xs font-normal text-ink-muted" scope="row">{copy.wait}</th>
                    {diningFormulas.map(formula => <td className="py-3 text-center font-semibold" key={formula.id}>{formula.waitMinutes} min</td>)}
                  </tr>
                </tbody>
              </table>
              <p className="border-t border-line/60 pt-3 text-xs leading-5 font-medium">{diningFormulas[0].dishesPerOrder} {copy.dishesPerOrder}</p>
            </div>
            <p className="mt-3 text-xs leading-5 text-ink-muted sm:text-sm sm:leading-6">{copy.premium}</p>
          </div>

          <ol className="divide-y divide-line/60" role="list">
            {copy.steps.map((step, index) => (
              <li className="flex gap-3 py-3 first:pt-0 last:pb-0 lg:py-4" key={step.title}>
                <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold-deep/25 text-xs font-semibold text-gold-deep">{index + 1}</span>
                <div className="hidden min-w-0 lg:block">
                  <h3 className="text-base leading-7 font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ink-muted">{step.description}</p>
                </div>
                <details className="group min-w-0 flex-1 lg:hidden">
                  <summary className="flex min-h-7 cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-sm leading-6 font-semibold tracking-tight">{step.title}</h3>
                    <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-deep transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pt-2 pb-1 text-sm leading-6 text-ink-muted">{step.description}</p>
                </details>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-5 text-sm leading-6 font-semibold text-gold-deep lg:mt-6">{copy.steps[4].takeaway}</p>
        <p className="display-heading mt-6 rounded-lg bg-ink px-5 py-5 text-center text-xl leading-snug sm:text-2xl lg:mt-8 lg:py-6 lg:text-3xl" lang="en">
          <span className="block text-background sm:inline">{diningSlogan[0]}</span>{" "}
          <span className="block text-gold sm:inline">{diningSlogan[1]}</span>
        </p>
      </div>
    </section>
  );
}
