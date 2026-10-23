"use client";

import { restaurantInfo } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useLanguage();
  return <main className="section-shell flex min-h-svh flex-col items-start justify-center gap-6 py-20"><h1 className="display-heading text-5xl">{t.error.title}</h1><p className="max-w-xl text-lg leading-8 text-ink-muted">{t.error.description}</p><button className="label-caps rounded-lg bg-ink px-7 py-4 text-background" onClick={reset} type="button">{t.error.retry}</button><a href={restaurantInfo.phoneHref}>{restaurantInfo.phone}</a></main>;
}
