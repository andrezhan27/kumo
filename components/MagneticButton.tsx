"use client";

import type { ComponentProps } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export function MagneticButton({ children, className = "", size = "default", href, ...props }: ComponentProps<"a"> & { size?: "default" | "compact" }) {
  const { localizeHref } = useLanguage();
  return (
    <a className={`border-beam label-caps inline-flex items-center justify-center rounded-lg bg-ink text-background transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${size === "compact" ? "h-10 px-5" : "min-h-12 px-7 py-4"} ${className}`} href={href ? localizeHref(href) : undefined} {...props}>
      {children}
    </a>
  );
}
