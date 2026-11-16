import { useEffect, useState } from "react";
import { useGetCoursesQuery } from "../services/api";
import { CourseCard } from "../components/CourseCard";
import { SearchBox } from "../components/SearchBox";

const categories = ["Todas", "Programación", "Diseño", "Idiomas", "Ofimática"];

export function CatalogPage() {
  // data se renombra a cursos. Mientras no llegan, []
  const { data: courses = [], isLoading, isError } = useGetCoursesQuery();
  const [category, setCategory] = useState("Todas");
  const [text, setText] = useState("");

  // Filtra por categoría y por texto a la vez
  const visibleCourses = courses
    .filter((course) => category === "Todas" || course.category === category)
    .filter((course) => course.title.toLowerCase().includes(text.toLowerCase()));

  // Cambia el título de la pestaña
  useEffect(() => {
    document.title = `${visibleCourses.length} cursos · Academia`;
  }, [visibleCourses.length]);

  if (isLoading) {
    return <p>Cargando cursos...</p>;
  }

  if (isError) {
    return <p className="error">No se han podido cargar los cursos.</p>;
  }

  return (
    <>
      <h1>Catálogo de cursos</h1>

      <SearchBox text={text} onTextChange={setText} />

      <div className="filters">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)} disabled={cat === category}>
            {cat}
          </button>
        ))}
      </div>

      <p>{visibleCourses.length === 1 ? "1 curso" : `${visibleCourses.length} cursos`}</p>

      <div className="grid">
        {visibleCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}
