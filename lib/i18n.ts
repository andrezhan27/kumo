import type { Language } from "@/lib/content";

export function languageFromPath(pathname: string): Language {
  return /^\/en(?:\/|$)/.test(pathname) ? "en" : "fr";
}

export function localizedHref(href: string, language: Language) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const unprefixed = href.replace(/^\/en(?=\/|#|\?|$)/, "");
  const path = unprefixed.startsWith("/") ? unprefixed : `/${unprefixed}`;
  return language === "en" ? `/en${path.replace(/^\/(?=[#?]|$)/, "")}` : path;
}
