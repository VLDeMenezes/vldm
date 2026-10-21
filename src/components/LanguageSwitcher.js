"use client";

import { IoLanguage } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import { track } from "@/lib/analytics";

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { locale, switchLocale, isPending } = useLocale();
  const nextLocale = locale === "en" ? "es" : "en";

  const handleSwitch = () => {
    track("language_change", { from: locale, to: nextLocale });
    switchLocale(nextLocale);
  };

  return (
    <button
      type="button"
      onClick={handleSwitch}
      disabled={isPending}
      aria-busy={isPending}
      aria-label={`${locale.toUpperCase()} — ${
        nextLocale === "es"
          ? t("A11y.switchToSpanish")
          : t("A11y.switchToEnglish")
      }`}
      className="group relative mx-auto flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-lg px-2 py-1 text-xl transition-colors hover:bg-black/10 disabled:opacity-60 dark:hover:bg-white/10 md:w-full"
    >
      <IoLanguage aria-hidden="true" className="text-2xl" />
      <span aria-hidden="true" className="text-[0.6rem] font-bold uppercase">
        {locale}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-Ink px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-white dark:text-Ink md:bottom-auto md:left-full md:top-1/2 md:mb-0 md:ml-2 md:-translate-y-1/2 md:translate-x-0"
      >
        {nextLocale === "es" ? "Español" : "English"}
      </span>
    </button>
  );
}
