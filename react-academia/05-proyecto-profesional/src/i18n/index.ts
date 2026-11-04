import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./es.json";
import en from "./en.json";

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: localStorage.getItem("language") ?? "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  localStorage.setItem("language", language);
  document.documentElement.lang = language;
});

export default i18n;
