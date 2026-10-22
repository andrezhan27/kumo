"use client";

import { restaurantInfo } from "@/lib/content";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="section-shell flex min-h-svh flex-col items-start justify-center gap-6 py-20"><h1 className="display-heading text-5xl">Un petit contretemps.</h1><p className="max-w-xl text-lg leading-8 text-ink-muted">Réessayez ou appelez-nous pour réserver votre table.</p><button className="label-caps rounded-lg bg-ink px-7 py-4 text-background" onClick={reset} type="button">Réessayer</button><a href={restaurantInfo.phoneHref}>{restaurantInfo.phone}</a></main>;
}
