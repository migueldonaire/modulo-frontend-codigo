import { Link, useParams } from "react-router";
import { useCourse } from "../hooks/useCourse";

export function CoursePage() {
  const { id } = useParams(); // en /courses/6, id vale "6"
  const { course, loading, error } = useCourse(id ?? ""); // ?? "": por si TypeScript cree que falta

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error || course === null) {
    return (
      <>
        <p className="error">{error}</p>
        <Link to="/">Volver al catálogo</Link>
      </>
    );
  }

  return (
    <article>
      <Link to="/">← Volver al catálogo</Link>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>
        {course.hours} horas · {course.price} € · {course.seats} plazas libres
      </p>
      <Link to={`/enrollment?course=${course.id}`}>Inscribirme</Link>
    </article>
  );
}
