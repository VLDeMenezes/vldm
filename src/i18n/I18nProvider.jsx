"use client";

import { useEffect, useState } from "react";
import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import resources from "./resources";
import { defaultLocale, defaultNS, locales } from "./settings";

/**
 * Initializes a per-request i18next instance synchronously, so the first
 * server render already contains translated markup. The layout keys this
 * provider by locale, which forces a clean instance on language navigation.
 */
export default function I18nProvider({ locale = defaultLocale, children }) {
  const [i18n] = useState(() => {
    const instance = createInstance();

    instance.use(initReactI18next).init({
      lng: locale,
      fallbackLng: defaultLocale,
      supportedLngs: locales,
      resources: {
        en: { [defaultNS]: resources.en },
        es: { [defaultNS]: resources.es },
      },
      defaultNS,
      initImmediate: false,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });

    return instance;
  });

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [i18n, locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
