export const locales = ["en", "es"];
export const defaultLocale = "en";
export const defaultNS = "init";
export const cookieName = "i18next";

export function isLocale(value) {
  return locales.includes(value);
}
