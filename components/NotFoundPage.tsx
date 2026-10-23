"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/components/LanguageProvider";

export function NotFoundPage() {
  const { t, localizeHref } = useLanguage();
  return <><Navbar /><main className="section-shell flex min-h-[75svh] flex-col items-start justify-center gap-6 pb-20 pt-32" id="main-content"><p className="label-caps text-gold-deep">404</p><h1 className="display-heading text-5xl md:text-7xl">{t.notFound.title}</h1><p className="max-w-xl text-lg leading-8 text-ink-muted">{t.notFound.description}</p><Link className="label-caps rounded-lg bg-ink px-7 py-4 text-background" href={localizeHref("/")}>{t.notFound.back}</Link></main><Footer /></>;
}
