import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetCoursesQuery } from "../../app/api";
import { CourseCard } from "./CourseCard";
import { SearchBox } from "../../components/ui/SearchBox";

const categories = ["Todas", "Programación", "Diseño", "Idiomas", "Ofimática"];

export function CatalogPage() {
  const { t } = useTranslation(); // t("clave") devuelve el texto en el idioma actual
  const { data: courses = [], isLoading, isError } = useGetCoursesQuery();
  const [category, setCategory] = useState("Todas");
  const [text, setText] = useState("");

  // Filtra por categoría y por texto a la vez
  const visibleCourses = courses
    .filter((course) => category === "Todas" || course.category === category)
    .filter((course) => course.title.toLowerCase().includes(text.toLowerCase()));

  // Cambia el título de la pestaña
  useEffect(() => {
    document.title = `${visibleCourses.length} · Academia`;
  }, [visibleCourses.length]);

  if (isLoading) {
    return <p>{t("catalog.loading")}</p>;
  }

  if (isError) {
    return <p className="error">{t("catalog.error")}</p>;
  }

  return (
    <>
      <h1>{t("catalog.title")}</h1>

      <SearchBox text={text} onTextChange={setText} />

      <div className="filters">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)} disabled={cat === category}>
            {cat === "Todas" ? t("catalog.all") : cat}
          </button>
        ))}
      </div>

      {/* count es el nombre especial que activa los plurales */}
      <p>{t("catalog.courses", { count: visibleCourses.length })}</p>

      <div className="grid">
        {visibleCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}
