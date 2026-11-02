"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoDownloadOutline, IoArrowDownOutline } from "react-icons/io5";
import { profile } from "@/data/profile";
import { track } from "@/lib/analytics";
import HeroVisual from "./HeroVisual";

export default function Hero({ years }) {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const [displayedYears, setDisplayedYears] = useState(years);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (
      years <= 1 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !heroRef.current ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    let intervalId;
    let startTimeoutId;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      observer.disconnect();
      setDisplayedYears(1);
      startTimeoutId = window.setTimeout(() => {
        let nextYears = 1;
        setIsCounting(true);
        intervalId = window.setInterval(() => {
          nextYears += 1;
          setDisplayedYears(nextYears);
          if (nextYears >= years) window.clearInterval(intervalId);
        }, 280);
      }, 30);
    });

    observer.observe(heroRef.current);
    return () => {
      observer.disconnect();
      window.clearTimeout(startTimeoutId);
      window.clearInterval(intervalId);
    };
  }, [years]);

  return (
    <section
      ref={heroRef}
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
            <span className="sr-only">+{years}</span>
            <span className="experience-counter" aria-hidden="true">
              <span
                className={`experience-counter__track${isCounting ? " experience-counter__track--animated" : ""}`}
                style={{
                  transform: `translateY(-${years - displayedYears}em)`,
                }}
              >
                {Array.from({ length: years }, (_, index) => (
                  <span key={index}>+{years - index}</span>
                ))}
              </span>
            </span>{" "}
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
          </p>
        </div>

        <div className="order-first lg:order-last">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
