import { useTranslation } from "react-i18next";

type SearchBoxProps = {
  text: string;
  onTextChange: (text: string) => void;
};

export function SearchBox({ text, onTextChange }: SearchBoxProps) {
  const { t } = useTranslation();
  return (
    <div>
      <label htmlFor="search">{t("search.label")}</label>
      <input
        id="search"
        type="search"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
      />
    </div>
  );
}
