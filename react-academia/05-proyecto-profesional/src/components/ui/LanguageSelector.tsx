import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <div role="group" aria-label="Idioma">
      {["es", "en"].map((language) => (
        <button
          key={language}
          onClick={() => i18n.changeLanguage(language)}
          aria-pressed={i18n.language === language}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
