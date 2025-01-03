import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./en/init.json";
import esTranslations from "./es/init.json";

export const defaultNS = "init";

i18next.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: { init: enTranslations },
    es: { init: esTranslations },
  },
  defaultNS,
});

// Función para cambiar el idioma
export function changeLanguage(language) {
  i18next.changeLanguage(language);
}
