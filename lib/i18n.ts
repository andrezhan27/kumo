import type { Language } from "@/lib/content";

export function languageFromPath(pathname: string): Language {
  const prefix = pathname.match(/^\/(en|nl)(?:\/|$)/)?.[1];
  return prefix === "en" || prefix === "nl" ? prefix : "fr";
}

export function localizedHref(href: string, language: Language) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const unprefixed = href.replace(/^\/(en|nl)(?=\/|#|\?|$)/, "");
  const path = unprefixed.startsWith("/") ? unprefixed : `/${unprefixed}`;
  return language === "fr" ? path : `/${language}${path.replace(/^\/(?=[#?]|$)/, "")}`;
}
