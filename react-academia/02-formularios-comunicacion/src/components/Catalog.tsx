import { useState } from "react";
import { getCourses } from "../services/coursesService";
import { CourseCard } from "./CourseCard";
import { SearchBox } from "./SearchBox";

const categories = ["Todas", "Programación", "Diseño", "Idiomas", "Ofimática"];

export function Catalog() {
  const courses = getCourses();
  const [category, setCategory] = useState("Todas");
  const [text, setText] = useState(""); // el estado está en el padre

  // Filtra por categoría y por texto a la vez
  const visibleCourses = courses
    .filter((course) => category === "Todas" || course.category === category)
    .filter((course) => course.title.toLowerCase().includes(text.toLowerCase()));

  return (
    <main>
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
    </main>
  );
}
