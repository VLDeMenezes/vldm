"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { featuredProjects, otherProjects } from "@/data/projects";
import { track } from "@/lib/analytics";
import { useState } from "react";
import ProjectDialog from "./ProjectDialog";
import CaseStudiesSection from "./CaseStudiesSection";

function ProjectCard({ project, onOpen, t }) {
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-xl border border-black/10 bg-Surface shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-SurfaceDark">
      <Image
        src={project.image}
        alt=""
        width={640}
        height={400}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
        className="h-44 w-full bg-black/5 object-contain p-3 dark:bg-white/5"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold">{project.name}</h3>
          <span className="chip shrink-0">{project.year}</span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide">
          {t(project.roleKey)}
        </p>
        <p className="text-sm leading-relaxed">
          {t("Work.impact." + project.slug)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={t("A11y.openProject", { name: project.name })}
        className="absolute inset-0 z-10 rounded-xl"
      />
    </li>
  );
}

export default function ProjectSection() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  const openProject = (project) => {
    track("project_open", { project: project.slug });
    setSelectedProject(project);
  };

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="rounded-2xl bg-Surface p-6 text-Ink shadow-sm dark:bg-SurfaceDark dark:text-InkDark md:p-10"
    >
      <h2 id="work-title" className="text-3xl font-black">
        {t("Work.title")}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed md:text-base">
        {t("Work.subtitle")}
      </p>

      <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOpen={openProject}
            t={t}
          />
        ))}
      </ul>

      {otherProjects.length > 0 ? (
        <details className="mt-8 rounded-xl border border-black/10 p-4 dark:border-white/10">
          <summary className="min-h-11 cursor-pointer text-sm font-bold">
            {t("Work.more")} ({otherProjects.length})
          </summary>
          <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onOpen={openProject}
                t={t}
              />
            ))}
          </ul>
        </details>
      ) : null}

      <CaseStudiesSection />

      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
