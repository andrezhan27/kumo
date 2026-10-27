"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { diningFormulas, diningSlogan, reservationHref } from "@/lib/content";

export function HowItWorks() {
  const { t, localizeHref } = useLanguage();
  const copy = t.howItWorks;
  const accordionId = useId();
  const [openSteps, setOpenSteps] = useState<number[]>([]);

  function toggleStep(index: number) {
    setOpenSteps(current => current.includes(index) ? current.filter(step => step !== index) : [...current, index]);
  }

  return (
    <section aria-labelledby="how-it-works-heading" className="border-b border-line/50 bg-background py-10 sm:py-12 lg:py-14" id="how-it-works">
      <div className="section-shell max-w-6xl">
        <p className="label-caps text-gold-deep">{copy.eyebrow}</p>
        <h2 className="display-heading mt-3 text-3xl leading-[1.1] sm:text-4xl lg:text-5xl" id="how-it-works-heading">{copy.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-muted sm:text-base sm:leading-7">{copy.description}</p>

        <div className="mt-5 grid items-start gap-5 sm:mt-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
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
              <li className="py-2 first:pt-0 last:pb-0" key={step.title}>
                <h3>
                  <button aria-controls={`${accordionId}-${index}`} aria-expanded={openSteps.includes(index)} className="group flex min-h-10 w-full items-center gap-3 rounded-sm text-left" onClick={() => toggleStep(index)} type="button">
                    <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold-deep/25 text-xs font-semibold text-gold-deep">{index + 1}</span>
                    <span className="flex-1 text-sm leading-6 font-semibold tracking-tight transition-colors group-hover:text-gold-deep lg:text-base">{step.title}</span>
                    <ChevronDown aria-hidden="true" className="how-it-works-chevron h-4 w-4 shrink-0 text-gold-deep" data-open={openSteps.includes(index)} />
                  </button>
                </h3>
                <div aria-hidden={!openSteps.includes(index)} className="how-it-works-panel" data-open={openSteps.includes(index)} id={`${accordionId}-${index}`} inert={!openSteps.includes(index)}>
                  <div className="min-h-0 overflow-hidden">
                    <p className="pt-1 pr-7 pb-2 pl-10 text-sm leading-6 text-ink-muted">{step.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-4 text-sm leading-6 font-semibold text-gold-deep">{copy.steps[4].takeaway}</p>
        <a className="display-heading mt-5 block rounded-lg bg-ink px-5 py-3.5 text-center text-xl leading-snug transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:py-5 sm:text-2xl lg:mt-6 lg:py-6 lg:text-3xl" href={localizeHref(reservationHref)} lang="en">
          <span className="block text-background sm:inline">{diningSlogan[0]}</span>{" "}
          <span className="block text-background sm:inline">{diningSlogan[1]}{" "}<span className="text-gold">{diningSlogan[2]}</span></span>
        </a>
      </div>
    </section>
  );
}
