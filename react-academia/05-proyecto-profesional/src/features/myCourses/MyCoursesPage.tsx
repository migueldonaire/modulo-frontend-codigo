import { Link } from "react-router";
import { useGetCoursesQuery } from "../../app/api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { remove } from "./myCoursesSlice";

export function MyCoursesPage() {
  const ids = useAppSelector((state) => state.myCourses.ids);
  const dispatch = useAppDispatch();
  const { data: courses = [], isLoading } = useGetCoursesQuery(); // sale de la caché

  if (isLoading) {
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
            <button onClick={() => dispatch(remove(course.id))}>Quitar</button>
          </li>
        ))}
      </ul>
      <p>Total: {total} €</p>
    </section>
  );
}
