"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { caseStudies } from "@/data/caseStudies";
import { track } from "@/lib/analytics";

const STAR_PARTS = ["situation", "task", "action", "result"];

export default function CaseStudiesSection() {
  const { t } = useTranslation();

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-title"
      className="mt-14 border-t border-black/10 pt-10 dark:border-white/10"
    >
      <p className="eyebrow">{t("CaseStudies.eyebrow")}</p>
      <h3
        id="case-studies-title"
        className="mt-2 text-2xl font-black md:text-3xl"
      >
        {t("CaseStudies.title")}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed md:text-base">
        {t("CaseStudies.subtitle")}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {caseStudies.map((study) => {
          const copy = t(`CaseStudies.items.${study.id}`, {
            returnObjects: true,
          });

          return (
            <article
              key={study.id}
              className="flex flex-col gap-5 rounded-xl border border-black/10 bg-Background/60 p-5 dark:border-white/10 dark:bg-Darkground/40"
            >
              <header className="flex items-center gap-3">
                <Image
                  src={study.logo}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-lg bg-white/80 object-contain p-1 dark:bg-white/10"
                />
                <div>
                  <h4 className="text-lg font-bold">{study.company}</h4>
                  <p className="text-xs font-medium">{study.period}</p>
                </div>
              </header>

              <ul
                className={`grid gap-2 ${
                  study.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"
                }`}
              >
                {study.metrics.map((metric) => (
                  <li
                    key={metric.labelKey}
                    className="rounded-lg bg-black/5 p-2 text-center dark:bg-white/10"
                  >
                    <span className="block text-lg font-black leading-tight">
                      {metric.value}
                    </span>
                    <span className="mt-0.5 block text-[0.65rem] font-medium leading-tight">
                      {t(metric.labelKey)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="space-y-3">
                {STAR_PARTS.map((part) => (
                  <div key={part}>
                    <dt className="text-[0.65rem] font-bold uppercase tracking-[0.16em]">
                      {t(`CaseStudies.${part}`)}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-relaxed">
                      {copy?.[part]}
                    </dd>
                  </div>
                ))}
              </dl>

              <ul
                className="mt-auto flex flex-wrap gap-1.5"
                aria-label={t("A11y.technologies")}
              >
                {study.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>

              {study.url ? (
                <a
                  className="link-accent w-fit text-sm"
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("case_study_open", { id: study.id })}
                >
                  {t("CaseStudies.open", { company: study.company })}
                  <span className="sr-only">
                    {" "}
                    ({t("A11y.opensInNewTab")})
                  </span>
                </a>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
