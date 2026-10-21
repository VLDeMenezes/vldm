"use client";

import { useTranslation } from "react-i18next";
import { coreSkills, skillGroups } from "@/data/skills";

export default function SkillsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mt-12 border-t border-Ink/20 pt-8 dark:border-InkDark/20"
    >
      <h3 id="skills-title" className="text-2xl font-bold">
        {t("Skills.title")}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed md:text-base">
        {t("Skills.subtitle")}
      </p>

      <div className="mt-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.16em]">
          {t("Skills.core")}
        </h4>
        <ul className="mt-2 flex flex-wrap gap-2">
          {coreSkills.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-SectionDark px-3 py-1 text-sm font-semibold text-white dark:bg-DetailLight dark:text-Ink"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <div key={group.id}>
            <h4 className="text-sm font-bold">{t(group.labelKey)}</h4>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="chip dark cursor-default hover:bg-DetailLight hover:text-white dark:hover:bg-Detail"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
