"use client";

import { useTranslation } from "react-i18next";
import { navItems, sectionIds } from "@/data/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import DarkModeToggle from "./DarkModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default function NavBar() {
  const { t } = useTranslation();
  const active = useScrollSpy(sectionIds);

  return (
    <nav
      aria-label={t("A11y.primaryNav")}
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-NavBar/95 backdrop-blur dark:border-white/10 dark:bg-SectionDark/95 md:inset-y-0 md:left-0 md:right-auto md:w-24 md:border-r md:border-t-0"
    >
      <ul className="flex h-full items-center justify-around gap-1 px-2 py-1 md:flex-col md:justify-center md:gap-3 md:py-6">
        {navItems.map((item) => {
          const isActive = active === item.id;

          return (
            <li key={item.id} className="flex-1 md:w-full md:flex-none">
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1 text-center transition-colors ${
                  isActive
                    ? "bg-SectionLigth text-Ink dark:bg-DetailLight dark:text-Ink"
                    : "text-Ink hover:bg-black/10 dark:text-InkDark dark:hover:bg-white/10"
                }`}
              >
                <span aria-hidden="true" className="text-xl md:text-2xl">
                  {item.icon}
                </span>
                <span className="text-[0.6rem] font-semibold leading-tight md:text-[0.65rem]">
                  {t(item.labelKey)}
                </span>
              </a>
            </li>
          );
        })}
        <li className="flex-1 md:w-full md:flex-none">
          <LanguageSwitcher />
        </li>
        <li className="flex-1 md:w-full md:flex-none">
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
}
