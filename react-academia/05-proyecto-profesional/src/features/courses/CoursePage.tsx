import { Link, useParams } from "react-router";
import { useGetCourseQuery } from "../../app/api";

export function CoursePage() {
  const { id = "" } = useParams(); // = "": valor por defecto
  const { data: course, isLoading, isError } = useGetCourseQuery(id);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isError || !course) {
    return (
      <>
        <p className="error">Ese curso no existe.</p>
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
