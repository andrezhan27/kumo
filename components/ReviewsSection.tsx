"use client";

import Image from "next/image";
import { useContinuousScroll } from "@/components/useContinuousScroll";
import { Star } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { guestReviews, reviewsHref } from "@/lib/reviews";

function GoogleMark() {
  return (
    <svg aria-hidden="true" className="h-6 w-6 shrink-0" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.303C33.654 32.657 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 5.053 29.268 3 24 3 12.402 3 3 12.402 3 24s9.402 21 21 21 21-9.402 21-21c0-1.408-.145-2.783-.4-4.1Z" />
      <path fill="#FF3D00" d="m6.306 14.225 6.571 4.819C14.655 14.642 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 5.053 29.268 3 24 3 15.934 3 8.938 7.553 5.423 14.225Z" />
      <path fill="#4CAF50" d="M24 45c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.94 11.94 0 0 1 24 37c-5.202 0-9.617-3.317-11.283-7.946l-6.522 5.025C9.665 40.556 16.31 45 24 45Z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.303a12.04 12.04 0 0 1-4.088 5.573l6.194 5.235C41.756 34.859 45 29.95 45 24c0-1.408-.145-2.783-.4-4.1Z" />
    </svg>
  );
}

export function ReviewsSection() {
  const { t, language } = useLanguage();
  const trackRef = useContinuousScroll(16);

  return (
    <section aria-labelledby="reviews-heading" className="overflow-hidden bg-background py-6 text-ink md:py-10" id="reviews">
      <h2 className="sr-only" id="reviews-heading">{t.reviews.title}</h2>
      <p className="sr-only" id="reviews-description">{t.reviews.description}</p>

      <div className="section-shell relative h-[280px] max-w-[1200px] overflow-hidden rounded-2xl sm:h-[340px] lg:h-[420px] xl:h-[480px]">
        <Image alt={t.space.imageAlts[4]} className="object-cover object-center" fill sizes="(min-width: 1305px) 1200px, 92vw" src="/space/space-05.webp" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
        <a className="absolute top-4 left-4 flex items-center gap-3 rounded-xl border border-line/70 bg-surface px-3 py-3 text-ink shadow-soft sm:top-6 sm:left-6 sm:px-4" href={reviewsHref} rel="noopener noreferrer" target="_blank">
          <GoogleMark />
          <span>
            <span className="label-caps block text-[0.6rem] tracking-[0.1em] text-ink-muted sm:text-[0.65rem]">{t.reviews.eyebrow}</span>
            <span aria-label={t.reviews.fiveStars} className="mt-1 flex gap-0.5 text-gold" role="img">
              {Array.from({ length: 5 }, (_, index) => <Star aria-hidden="true" className="h-4 w-4 fill-current" key={index} />)}
            </span>
            <span className="mt-1 block text-[0.6rem] text-ink-muted sm:text-[0.65rem]">{t.reviews.selectionLabel}</span>
          </span>
        </a>
      </div>

      <div className="relative z-10 -mt-20 md:-mt-32 lg:-mt-36">
        <div
          aria-describedby="reviews-description"
          aria-label={t.reviews.title}
          className="reviews-track overflow-x-auto py-1"
          id="guest-reviews"
          ref={trackRef}
          role="region"
          tabIndex={0}
        >
          <div className="flex w-max">
            {[0, 1, 2].map(setIndex => (
              <ul aria-hidden={setIndex !== 0} className="flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4" data-marquee-set="" key={setIndex}>
                {guestReviews.map(review => (
                  <li className="flex min-h-62 w-[80vw] max-w-80 shrink-0 flex-col rounded-xl border border-line/70 bg-surface p-5 text-ink sm:w-80 sm:max-w-none md:w-[340px] md:p-6 lg:w-90" key={review.author}>
                    <div aria-label={t.reviews.fiveStars} className="flex gap-0.5 text-gold" role="img">
                      {Array.from({ length: review.rating }, (_, star) => <Star aria-hidden="true" className="h-3.5 w-3.5 fill-current" key={star} />)}
                    </div>
                    <figure className="mt-4 flex flex-1 flex-col">
                      <blockquote className="text-[1.0625rem] leading-[1.45] whitespace-pre-line md:text-lg">“{review.excerpt[language]}”</blockquote>
                      <figcaption className="mt-auto flex items-center gap-2.5 pt-5">
                        <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-strong text-base font-semibold text-gold">{Array.from(review.author)[0].toUpperCase()}</span>
                        <span className="min-w-0">
                          <span className="block text-[0.8125rem] font-semibold">{review.author}</span>
                          <span className="mt-0.5 block text-[0.6875rem] leading-4 text-ink-muted">Google · {review.originalLanguage === language ? t.reviews.excerpt : t.reviews.translatedExcerpt}</span>
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-background to-transparent md:w-10" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-background to-transparent md:w-10" />
      </div>

      <div className="section-shell mt-4 flex justify-center">
        <a className="inline-flex min-h-10 items-center justify-center gap-2 text-[0.8125rem] text-ink-muted underline-offset-4 hover:text-gold-deep hover:underline" href={reviewsHref} rel="noopener noreferrer" target="_blank">
          {t.reviews.googleLink}
        </a>
      </div>
    </section>
  );
}
