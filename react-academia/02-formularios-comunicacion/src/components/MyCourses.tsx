import { getCourses } from "../services/coursesService";
import { useMyCourses } from "../context/MyCoursesContext";

export function MyCourses() {
  const { ids, remove } = useMyCourses();
  const selectedCourses = getCourses().filter((course) => ids.includes(course.id));
  const total = selectedCourses.reduce((sum, course) => sum + course.price, 0);

  if (selectedCourses.length === 0) {
    return <p>Todavía no has elegido ningún curso.</p>;
  }

  return (
    <section>
      <h2>Mis cursos</h2>
      <ul>
        {selectedCourses.map((course) => (
          <li key={course.id}>
            {course.title} · {course.price} €{" "}
            <button onClick={() => remove(course.id)}>Quitar</button>
          </li>
        ))}
      </ul>
      <p>Total: {total} €</p>
    </section>
  );
}
