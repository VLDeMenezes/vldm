const MONTHS = {
  en: new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }),
  es: new Intl.DateTimeFormat("es", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }),
};

/** Formats a `YYYY-MM` string without depending on the visitor's timezone. */
export function formatMonth(value, locale = "en") {
  if (!value) return "";
  const formatter = MONTHS[locale] ?? MONTHS.en;
  return formatter.format(new Date(`${value}-01T00:00:00Z`));
}
