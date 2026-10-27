"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, Star } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { guestReviews, reviewsHref } from "@/lib/reviews";

export function ReviewsSection() {
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <section aria-labelledby="reviews-heading" className="bg-background py-section" id="reviews">
      <div className="section-shell">
        <p className="label-caps text-gold-deep">{t.reviews.eyebrow}</p>
        <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display-heading max-w-2xl text-5xl leading-none md:text-7xl" id="reviews-heading">{t.reviews.title}</h2>
          <p className="max-w-sm text-sm leading-7 text-ink-muted">{t.reviews.description}</p>
        </div>

        <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 xl:grid-cols-5" id="guest-reviews">
          {guestReviews.map((review, index) => (
            <li className={`${index >= 5 && !expanded ? "hidden md:flex" : "flex"} min-w-0 flex-col rounded-lg border border-line/55 bg-surface p-5 sm:p-6`} key={review.author}>
              <div aria-label={t.reviews.fiveStars} className="flex gap-1 text-gold-deep" role="img">
                {Array.from({ length: review.rating }, (_, star) => <Star aria-hidden="true" className="h-3.5 w-3.5 fill-current" key={star} />)}
              </div>
              <figure className="mt-5 flex flex-1 flex-col">
                <blockquote className="text-sm leading-7 whitespace-pre-line text-ink">“{review.excerpt[language]}”</blockquote>
                <figcaption className="mt-auto pt-6">
                  <span className="block text-sm font-semibold">{review.author}</span>
                  <span className="mt-1 block text-xs leading-5 text-ink-muted">Google · {review.originalLanguage === language ? t.reviews.excerpt : t.reviews.translatedExcerpt}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10">
          <button
            aria-controls="guest-reviews"
            aria-expanded={expanded}
            className="label-caps inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line/70 px-6 py-4 text-ink transition-colors hover:border-gold-deep md:hidden"
            onClick={() => setExpanded(value => !value)}
            type="button"
          >
            {expanded ? t.reviews.showLess : t.reviews.showMore}
            <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
          <a className="label-caps inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-6 py-4 text-background transition-colors hover:bg-gold-deep" href={reviewsHref} rel="noopener noreferrer" target="_blank">
            {t.reviews.googleLink}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
