"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { diningSlogan, reservationHref } from "@/lib/content";

export function HowItWorks() {
  const { t, localizeHref } = useLanguage();
  const copy = t.howItWorks;
  const accordionId = useId();
  const [openSteps, setOpenSteps] = useState<number[]>([]);

  function toggleStep(index: number) {
    setOpenSteps(current => current.includes(index) ? current.filter(step => step !== index) : [...current, index]);
  }

  return (
    <div className="mt-8 border-t border-line/60 pt-8" id="how-it-works">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <h3 className="display-heading text-2xl leading-tight text-gold sm:text-3xl">{copy.title}</h3>
          <p className="mt-4 max-w-sm text-sm leading-7 text-ink-muted">{copy.steps[3].description}</p>
          <p className="mt-3 max-w-sm text-sm leading-7 font-semibold text-gold">{copy.steps[4].takeaway}</p>
        </div>
        <ol className="divide-y divide-line/60" role="list">
          {copy.steps.map((step, index) => (
            <li className="py-2 first:pt-0 last:pb-0" key={step.title}>
              <h4>
                <button aria-controls={`${accordionId}-${index}`} aria-expanded={openSteps.includes(index)} className="group flex min-h-11 w-full items-center gap-3 rounded-sm text-left" onClick={() => toggleStep(index)} type="button">
                  <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/30 text-xs font-semibold text-gold">{index + 1}</span>
                  <span className="flex-1 text-sm leading-6 font-semibold tracking-tight transition-colors group-hover:text-gold lg:text-base">{step.title}</span>
                  <ChevronDown aria-hidden="true" className="how-it-works-chevron h-4 w-4 shrink-0 text-gold" data-open={openSteps.includes(index)} />
                </button>
              </h4>
              <div aria-hidden={!openSteps.includes(index)} className="how-it-works-panel" data-open={openSteps.includes(index)} id={`${accordionId}-${index}`} inert={!openSteps.includes(index)}>
                <div className="min-h-0 overflow-hidden">
                  <p className="pt-1 pr-7 pb-2 pl-10 text-sm leading-6 text-ink-muted">{step.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <a className="display-heading mt-8 block rounded-lg border border-gold/30 bg-surface px-5 py-5 text-center text-2xl leading-snug transition-opacity hover:opacity-90 sm:py-6 sm:text-3xl" href={localizeHref(reservationHref)} lang="en">
        <span className="block text-ink sm:inline">{diningSlogan[0]}</span>{" "}
        <span className="block text-ink sm:inline">{diningSlogan[1]}{" "}<span className="text-gold">{diningSlogan[2]}</span></span>
      </a>
    </div>
  );
}
