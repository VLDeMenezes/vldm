"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { defaultLocale, isLocale } from "@/i18n/settings";

export default function NotFound() {
  const params = useParams();
  const { t } = useTranslation();
  const locale = isLocale(params?.locale) ? params.locale : defaultLocale;

  return (
    <section className="flex min-h-[60vh] flex-col items-start justify-center gap-4 rounded-2xl bg-SectionLigth p-8 text-Ink dark:bg-SectionDark dark:text-InkDark">
      <p className="text-6xl font-black">404</p>
      <h1 className="text-3xl font-black">{t("NotFound.title")}</h1>
      <p className="max-w-xl text-base">{t("NotFound.description")}</p>
      <Link className="button-primary" href={`/${locale}`}>
        {t("NotFound.back")}
      </Link>
    </section>
  );
}
