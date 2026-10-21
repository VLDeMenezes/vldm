"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  IoCloseOutline,
  IoLogoGithub,
  IoOpenOutline,
} from "react-icons/io5";
import { useDialog } from "@/hooks/useDialog";
import { track } from "@/lib/analytics";

export default function ProjectDialog({ project, onClose }) {
  const { t } = useTranslation();
  const { ref, close } = useDialog(Boolean(project), onClose);

  const handleBackdropClick = (event) => {
    if (event.target === ref.current) {
      close();
    }
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby={project ? "project-dialog-title" : undefined}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={handleBackdropClick}
      className="m-auto max-h-[90dvh] w-[min(92vw,56rem)] overflow-hidden rounded-2xl border border-black/10 bg-Surface p-0 text-Ink shadow-2xl dark:border-white/10 dark:bg-SurfaceDark dark:text-InkDark"
    >
      {project ? (
        <div className="max-h-[90dvh] overflow-y-auto">
          <div className="relative">
            <Image
              src={project.mainImage || project.image}
              alt={`${project.name} — ${t("Work.impact." + project.slug)}`}
              width={1000}
              height={600}
              sizes="(min-width: 768px) 56rem, 92vw"
              className="max-h-[45dvh] w-full bg-black/5 object-contain p-4 dark:bg-white/5"
            />
            <button
              type="button"
              onClick={close}
              aria-label={t("A11y.closeDialog")}
              className="absolute right-3 top-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-Ink/90 text-2xl text-white shadow-lg transition-colors hover:bg-Ink dark:bg-white/90 dark:text-Ink dark:hover:bg-white"
            >
              <IoCloseOutline aria-hidden="true" />
            </button>
          </div>

          <div className="p-5 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2
                  id="project-dialog-title"
                  className="text-2xl font-black md:text-3xl"
                >
                  {project.name}
                </h2>
                <p className="mt-1 text-sm font-semibold">
                  {t(project.roleKey)} · {project.year}
                </p>
              </div>
            </div>

            <p className="mt-4 text-base leading-relaxed">
              {t("Projects." + project.name)}
            </p>
            <p className="mt-2 text-sm font-medium">
              {t("Work.impact." + project.slug)}
            </p>

            <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.16em]">
              {t("Work.technologies")}
            </h3>
            <ul
              className="mt-2 flex flex-wrap gap-2"
              aria-label={t("A11y.technologies")}
            >
              {project.tecs.map((tech) => (
                <li key={tech.name} className="chip gap-1.5">
                  <span aria-hidden="true" className="text-base">
                    {tech.icon}
                  </span>
                  {tech.name}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.path && project.path !== project.github ? (
                <a
                  className="button-primary"
                  href={project.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("project_link_click", {
                      project: project.slug,
                      type: "live",
                    })
                  }
                >
                  <IoOpenOutline aria-hidden="true" className="text-lg" />
                  {t("Work.live")}
                  <span className="sr-only">
                    {" "}
                    ({t("A11y.opensInNewTab")})
                  </span>
                </a>
              ) : null}

              {project.github ? (
                <a
                  className="button-secondary"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("project_link_click", {
                      project: project.slug,
                      type: "repo",
                    })
                  }
                >
                  <IoLogoGithub aria-hidden="true" className="text-lg" />
                  {t("Work.code")}
                  <span className="sr-only">
                    {" "}
                    ({t("A11y.opensInNewTab")})
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
