import { Link } from "react-router";
import type { Course } from "../services/api";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { add, remove } from "../features/myCourses/myCoursesSlice";
import { Badge } from "./Badge";
import styles from "./CourseCard.module.css";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  // Selector: ¿este curso está elegido?
  const selected = useAppSelector((state) => state.myCourses.ids.includes(course.id));
  const dispatch = useAppDispatch();

  return (
    <article className={styles.card}>
      <Badge>{course.category}</Badge>
      {course.seats <= 3 && <Badge warning>Últimas plazas</Badge>}
      <h2 className={styles.title}>
        <Link to={`/courses/${course.id}`}>{course.title}</Link>
      </h2>
      <p>{course.hours} horas</p>
      <p className={styles.price}>{course.price} €</p>
      {/* anadir(...) crea la acción y dispatch la envía */}
      <button
        className={selected ? `${styles.button} ${styles.buttonActive}` : styles.button}
        onClick={() => dispatch(selected ? remove(course.id) : add(course.id))}
      >
        {selected ? "Quitar de Mis cursos" : "Añadir a Mis cursos"}
      </button>
    </article>
  );
}
