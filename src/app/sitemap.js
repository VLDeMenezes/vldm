import { locales } from "@/i18n/settings";
import { profile } from "@/data/profile";

export default function sitemap() {
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${profile.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: {
        en: `${profile.url}/en`,
        es: `${profile.url}/es`,
        "x-default": `${profile.url}/en`,
      },
    },
  }));
}
