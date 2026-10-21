"use client";

import { useTranslation } from "react-i18next";
import { IoDownloadOutline, IoArrowDownOutline } from "react-icons/io5";
import { profile } from "@/data/profile";
import { track } from "@/lib/analytics";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden rounded-2xl bg-Surface p-6 text-Ink dark:bg-SectionDark dark:text-InkDark md:p-10"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="eyebrow text-Ink dark:text-DetailLight">
            {t("Hero.greeting")}
          </p>

          <h1
            id="hero-title"
            className="mt-3 text-balance text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
          >
            <span className="block text-base font-bold sm:text-lg">
              {t("Hero.name")}
            </span>{" "}
            {t("Hero.role")}
          </h1>

          <p className="mt-3 text-base font-semibold sm:text-lg">
            {t("Hero.stack")}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed">
            {t("Hero.summary")}
          </p>

          <p className="mt-4 max-w-xl font-semibold italic">{t("Hero.goal")}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              className="button-primary"
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("A11y.viewCv")}
              onClick={() => track("cv_open")}
            >
              <IoDownloadOutline aria-hidden="true" className="text-lg" />
              {t("Hero.viewCv")}
            </a>

            <a className="button-secondary" href="#work">
              <IoArrowDownOutline aria-hidden="true" className="text-lg" />
              {t("Hero.viewWork")}
            </a>
          </div>

          <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
            <span>{t("Hero.location")}</span>
            <span>{t("Hero.experience")}</span>
          </p>
        </div>

        <div className="order-first lg:order-last">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
