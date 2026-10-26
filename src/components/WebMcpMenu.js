"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import {
  IoChevronForward,
  IoClose,
  IoDownloadOutline,
  IoMailOutline,
  IoOpenOutline,
  IoPersonOutline,
  IoPhonePortraitOutline,
  IoSparkles,
} from "react-icons/io5";
import { profile } from "@/data/profile";
import { CV_FILENAME, RNFACTORY_URL, contactVictor } from "@/lib/webmcp";
import { track } from "@/lib/analytics";
import { useWebMcp } from "@/hooks/useWebMcp";

const rowClass =
  "group flex w-full items-start gap-3 rounded-xl border border-transparent p-2.5 text-left transition-colors hover:border-black/10 hover:bg-black/5 dark:hover:border-white/10 dark:hover:bg-white/10";

const iconClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/5 text-lg text-Ink dark:bg-white/10 dark:text-InkDark";

export default function WebMcpMenu() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isPreview = pathname?.endsWith("/movile") ?? false;
  const { status } = useWebMcp({ enabled: !isPreview });
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);

  const statusMeta = {
    checking: {
      text: t("WebMcp.status.checking"),
      dot: "bg-InkMuted dark:bg-InkDarkMuted",
    },
    active: {
      text: t("WebMcp.status.active"),
      dot: "bg-emerald-500",
    },
    unsupported: {
      text: t("WebMcp.status.unsupported"),
      dot: "bg-amber-500",
    },
    error: {
      text: t("WebMcp.status.error"),
      dot: "bg-red-500",
    },
  }[status];

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      setOpen(false);
      triggerRef.current?.focus();
    };

    const handlePointerDown = (event) => {
      if (rootRef.current?.contains(event.target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  const handleToggle = () => {
    setOpen((value) => {
      if (!value) track("webmcp_menu_open", { status });
      return !value;
    });
  };

  const close = () => setOpen(false);

  // The mobile preview is a full-screen iframe; its own copy of the site
  // already exposes these tools inside the frame.
  if (isPreview) return null;

  return (
    <div
      ref={rootRef}
      className="fixed right-3 top-3 z-50 md:right-5 md:top-5"
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls="webmcp-panel"
        aria-label={t("WebMcp.buttonLabel")}
        className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-Surface/95 px-3.5 py-2 text-sm font-semibold text-Ink shadow-lg backdrop-blur transition-colors hover:bg-Surface dark:border-white/15 dark:bg-SectionDark/95 dark:text-InkDark dark:hover:bg-SectionDark"
      >
        <IoSparkles
          aria-hidden="true"
          className="text-lg text-AccentInk dark:text-DetailLight"
        />
        <span>{t("WebMcp.button")}</span>
        <span
          aria-hidden="true"
          className={`h-2 w-2 rounded-full ${statusMeta.dot}`}
        />
      </button>

      <div
        id="webmcp-panel"
        hidden={!open}
        className="absolute right-0 mt-2 max-h-[calc(100dvh-6rem)] w-[min(22rem,calc(100vw-1.5rem))] overflow-y-auto rounded-2xl border border-black/10 bg-Surface p-4 text-Ink shadow-2xl dark:border-white/15 dark:bg-SectionDark dark:text-InkDark"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-SectionDark text-lg text-white dark:bg-DetailLight dark:text-Ink">
            <IoSparkles aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-AccentInk dark:text-DetailLight">
              {t("WebMcp.eyebrow")}
            </p>
            <h2
              id="webmcp-title"
              className="mt-0.5 text-base font-black leading-snug"
            >
              {t("WebMcp.title")}
            </h2>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label={t("WebMcp.close")}
            className="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg transition-colors hover:bg-black/10 dark:hover:bg-white/10"
          >
            <IoClose aria-hidden="true" />
          </button>
        </div>

        <p className="mt-3 text-xs leading-relaxed muted">
          {t("WebMcp.intro")}
        </p>

        <div
          aria-live="polite"
          className="mt-3 flex items-center gap-2 rounded-lg border border-black/10 bg-black/[0.03] px-3 py-2 dark:border-white/10 dark:bg-white/5"
        >
          <span
            aria-hidden="true"
            className={`h-2 w-2 shrink-0 rounded-full ${statusMeta.dot}`}
          />
          <span className="text-xs font-semibold">{statusMeta.text}</span>
        </div>

        {status === "unsupported" ? (
          <p className="mt-1.5 text-[0.7rem] leading-relaxed muted">
            {t("WebMcp.unsupportedHint")}
          </p>
        ) : null}

        <div className="mt-3 rounded-lg border border-dashed border-black/15 bg-black/5 px-3 py-2 dark:border-white/20 dark:bg-white/5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-wide muted">
            {t("WebMcp.promptLabel")}
          </p>
          <p className="mt-0.5 text-xs font-semibold">
            &ldquo;{t("WebMcp.prompt")}&rdquo;
          </p>
        </div>

        <ul className="mt-3 space-y-1">
          <li>
            <a
              href={profile.cv}
              download={CV_FILENAME}
              data-webmcp-tool="download_cv"
              onClick={() => {
                track("webmcp_action", {
                  tool: "download_cv",
                  source: "menu",
                });
                close();
              }}
              className={rowClass}
            >
              <span aria-hidden="true" className={iconClass}>
                <IoDownloadOutline />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">
                  {t("WebMcp.tools.cv.label")}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed muted">
                  {t("WebMcp.tools.cv.description")}
                </span>
              </span>
              <IoChevronForward
                aria-hidden="true"
                className="mt-1 shrink-0 text-sm opacity-50 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </li>

          <li>
            <button
              type="button"
              data-webmcp-tool="contact_victor"
              onClick={() => {
                close();
                contactVictor({}, "menu");
              }}
              className={rowClass}
            >
              <span aria-hidden="true" className={iconClass}>
                <IoMailOutline />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">
                  {t("WebMcp.tools.contact.label")}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed muted">
                  {t("WebMcp.tools.contact.description")}
                </span>
              </span>
              <IoChevronForward
                aria-hidden="true"
                className="mt-1 shrink-0 text-sm opacity-50 transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </li>

          <li>
            <a
              href={RNFACTORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-webmcp-tool="open_rnfactory"
              onClick={() => {
                track("webmcp_action", {
                  tool: "open_rnfactory",
                  source: "menu",
                });
                close();
              }}
              className={rowClass}
            >
              <span aria-hidden="true" className={iconClass}>
                <IoPhonePortraitOutline />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">
                  {t("WebMcp.tools.rnfactory.label")}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed muted">
                  {t("WebMcp.tools.rnfactory.description")}
                </span>
                <span className="sr-only">
                  {" "}
                  ({t("A11y.opensInNewTab")})
                </span>
              </span>
              <IoChevronForward
                aria-hidden="true"
                className="mt-1 shrink-0 text-sm opacity-50 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </li>

          <li>
            <div
              data-webmcp-tool="get_portfolio_profile"
              className="flex items-start gap-3 rounded-xl p-2.5"
            >
              <span aria-hidden="true" className={iconClass}>
                <IoPersonOutline />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">
                  {t("WebMcp.tools.profile.label")}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed muted">
                  {t("WebMcp.tools.profile.description")}
                </span>
              </span>
              <span className="chip mt-0.5 shrink-0 text-[0.65rem]">
                {t("WebMcp.readOnly")}
              </span>
            </div>
          </li>
        </ul>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-black/10 pt-3 text-[0.7rem] dark:border-white/10">
          <p className="muted">{t("WebMcp.footer")}</p>
          <a
            href="https://webmachinelearning.github.io/webmcp"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent inline-flex items-center gap-1"
          >
            {t("WebMcp.learn")}
            <IoOpenOutline aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
