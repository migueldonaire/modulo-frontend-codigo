import { Link } from "react-router";
import { useCourses } from "../hooks/useCourses";
import { useMyCourses } from "../context/MyCoursesContext";

export function MyCoursesPage() {
  const { ids, remove } = useMyCourses();
  const { courses, loading } = useCourses();

  if (loading) {
    return <p>Cargando...</p>;
  }

  const selectedCourses = courses.filter((course) => ids.includes(course.id));
  const total = selectedCourses.reduce((sum, course) => sum + course.price, 0);

  if (selectedCourses.length === 0) {
    return (
      <>
        <p>Todavía no has elegido ningún curso.</p>
        <Link to="/">Ver el catálogo</Link>
      </>
    );
  }

  return (
    <section>
      <h1>Mis cursos</h1>
      <ul>
        {selectedCourses.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>{course.title}</Link> · {course.price} €{" "}
            <button onClick={() => remove(course.id)}>Quitar</button>
          </li>
        ))}
      </ul>
      <p>Total: {total} €</p>
    </section>
  );
}
