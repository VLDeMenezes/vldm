"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { experience } from "@/data/experience";
import { formatMonth } from "@/lib/format";
import { useLocale } from "@/hooks/useLocale";
import SkillsSection from "./SkillsSection";

export default function ExperienceSection() {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="rounded-2xl bg-SectionLigth p-6 text-Ink dark:bg-SectionDark dark:text-InkDark md:p-10"
    >
      <h2 id="experience-title" className="text-3xl font-black">
        {t("Experience.title")}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed md:text-base">
        {t("Experience.subtitle")}
      </p>

      <ol className="mt-8 space-y-9 border-l border-Ink/30 pl-6 dark:border-InkDark/30">
        {experience.map((job) => {
          const copy = t(`Experience.items.${job.id}`, {
            returnObjects: true,
          });
          const achievements = Array.isArray(copy?.achievements)
            ? copy.achievements
            : [];

          return (
            <li key={job.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-6 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-SectionDark ring-4 ring-SectionLigth dark:bg-DetailLight dark:ring-SectionDark"
              />

              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
                <div className="flex items-start gap-3">
                  <Image
                    src={job.logo}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-lg bg-white/80 object-contain p-1 dark:bg-white/10"
                  />
                  <div>
                    <h3 className="flex flex-wrap items-center gap-2 text-xl font-bold">
                      {job.company}
                      {job.current ? (
                        <span className="rounded-full bg-SectionDark px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white dark:bg-DetailLight dark:text-Ink">
                          {t("Experience.present")}
                        </span>
                      ) : null}
                    </h3>
                    <p className="font-semibold">{copy?.role}</p>
                    <p className="mt-1 text-sm">
                      {t(job.typeKey)} · {t(job.locationKey)}
                    </p>
                  </div>
                </div>

                <p className="shrink-0 text-sm font-bold md:text-right">
                  <time dateTime={job.start}>
                    {formatMonth(job.start, locale)}
                  </time>{" "}
                  —{" "}
                  {job.end ? (
                    <time dateTime={job.end}>
                      {formatMonth(job.end, locale)}
                    </time>
                  ) : (
                    t("Experience.present")
                  )}
                </p>
              </div>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed md:text-base">
                {achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>

              <ul
                className="mt-4 flex flex-wrap gap-1.5"
                aria-label={`${job.company} — ${t("Experience.stack")}`}
              >
                {job.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      <SkillsSection />
    </section>
  );
}
