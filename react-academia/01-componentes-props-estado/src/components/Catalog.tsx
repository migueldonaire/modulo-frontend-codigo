import { useState } from "react";
import { getCourses } from "../services/coursesService";
import { CourseCard } from "./CourseCard";

const categories = ["Todas", "Programación", "Diseño", "Idiomas", "Ofimática"];

export function Catalog() {
  const courses = getCourses();
  const [category, setCategory] = useState("Todas"); // lo que elige el usuario

  // Calculado en cada render: no va al estado
  const visibleCourses =
    category === "Todas" ? courses : courses.filter((course) => course.category === category);

  return (
    <main>
      <h1>Catálogo de cursos</h1>

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
