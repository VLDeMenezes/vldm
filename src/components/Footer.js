"use client";

import { useTranslation } from "react-i18next";

export default function Footer({ year }) {
  const { t } = useTranslation();

  return (
    <footer className="mt-12 border-t border-black/10 bg-NavBar/70 dark:border-white/10 dark:bg-SectionDark/70">
      <div className="section-shell flex flex-col gap-5 py-8 text-sm md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-lg font-black tracking-[0.3em]">VLDM</p>
          <p className="mt-1">{t("Footer.tagline")}</p>
          <p className="mt-1 text-xs">{t("Hero.location")}</p>
        </div>

        <div className="flex max-w-xl flex-col gap-2">
          <p>
            {t("Footer.security")}{" "}
            <a
              className="link-accent"
              href="https://securityheaders.com/?q=https%3A%2F%2Fvldm.is-a.dev%2F&followRedirects=on"
              target="_blank"
              rel="noopener noreferrer"
            >
              securityheaders.com
              <span className="sr-only"> ({t("A11y.opensInNewTab")})</span>
            </a>
          </p>
          <p className="text-xs">{t("Footer.analytics")}</p>
          <p className="text-xs">{t("Footer.rights", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
