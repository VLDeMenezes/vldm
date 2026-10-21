"use client";

import { useTranslation } from "react-i18next";

export default function SkipLink() {
  const { t } = useTranslation();

  return (
    <a className="skip-link" href="#main">
      {t("A11y.skip")}
    </a>
  );
}
