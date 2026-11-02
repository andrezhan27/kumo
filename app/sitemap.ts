import type { MetadataRoute } from "next";
import { localizedHref } from "@/lib/i18n";
import { siteOrigin } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/reservation"].flatMap(path => {
    const languages = {
      "fr-BE": `${siteOrigin}${localizedHref(path, "fr")}`,
      en: `${siteOrigin}${localizedHref(path, "en")}`,
      "nl-BE": `${siteOrigin}${localizedHref(path, "nl")}`,
      "x-default": `${siteOrigin}${localizedHref(path, "fr")}`,
    };
    return (["fr", "en", "nl"] as const).map(language => ({
      url: `${siteOrigin}${localizedHref(path, language)}`,
      alternates: { languages },
    }));
  });
}
