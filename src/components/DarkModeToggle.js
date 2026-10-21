"use client";

import { IoMoon, IoMoonOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { track } from "@/lib/analytics";

export default function DarkModeToggle() {
  const { t } = useTranslation();
  const { isDark, toggle } = useTheme();

  const handleToggle = () => {
    track("theme_change", { theme: isDark ? "light" : "dark" });
    toggle();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isDark}
      aria-label={t("A11y.toggleTheme")}
      className="group relative mx-auto flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 py-1 text-xl transition-colors hover:bg-black/10 dark:hover:bg-white/10 md:w-full"
    >
      {isDark ? (
        <IoMoon aria-hidden="true" className="text-2xl" />
      ) : (
        <IoMoonOutline aria-hidden="true" className="text-2xl" />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-Ink px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-white dark:text-Ink md:bottom-auto md:left-full md:top-1/2 md:mb-0 md:ml-2 md:-translate-y-1/2 md:translate-x-0"
      >
        {t("A11y.toggleTheme")}
      </span>
    </button>
  );
}
