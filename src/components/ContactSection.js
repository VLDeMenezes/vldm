"use client";

import { useTranslation } from "react-i18next";
import { contactLinks } from "@/data/contact";
import { track } from "@/lib/analytics";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="rounded-2xl bg-SectionLigth p-6 text-Ink dark:bg-SectionDark dark:text-InkDark md:p-10"
    >
      <p className="eyebrow text-Ink dark:text-DetailLight">
        {t("Contact.eyebrow")}
      </p>
      <h2 id="contact-title" className="mt-2 text-3xl font-black">
        {t("Contact.title")}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed md:text-base">
        {t("Contact.intro")}
      </p>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {contactLinks.map((link) => {
          const externalProps = link.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <li key={link.id}>
              <a
                href={link.href}
                {...externalProps}
                onClick={() =>
                  track("contact_click", { channel: link.event })
                }
                className="group flex h-full items-center gap-3 rounded-xl border border-black/15 bg-black/5 p-4 text-black transition-colors hover:bg-black/10 dark:border-white/20 dark:bg-white/5 dark:text-InkDark dark:hover:bg-white/10"
              >
                <span aria-hidden="true" className="shrink-0 text-3xl">
                  {link.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold">
                    {t(link.labelKey)}
                  </span>
                  <span className="mt-0.5 block break-all text-xs font-medium">
                    {link.value}
                  </span>
                  {link.external ? (
                    <span className="sr-only">
                      {" "}
                      ({t("A11y.opensInNewTab")})
                    </span>
                  ) : null}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 space-y-1 text-sm font-medium">
        <p>{t("Contact.location")}</p>
        <p>{t("Contact.availability")}</p>
        <p>{t("Contact.languages")}</p>
      </div>
    </section>
  );
}
