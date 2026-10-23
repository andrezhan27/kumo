import type { Language } from "@/lib/content";

export function localizedHref(href: string, language: Language) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const unprefixed = href.replace(/^\/en(?=\/|#|\?|$)/, "");
  const path = unprefixed.startsWith("/") ? unprefixed : `/${unprefixed}`;
  return language === "en" ? `/en${path.replace(/^\/(?=[#?]|$)/, "")}` : path;
}
