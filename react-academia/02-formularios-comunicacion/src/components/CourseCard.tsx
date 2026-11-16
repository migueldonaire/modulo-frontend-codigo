import type { Course } from "../services/coursesService";
import { useMyCourses } from "../context/MyCoursesContext";
import { Badge } from "./Badge";
import styles from "./CourseCard.module.css";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const { ids, add, remove } = useMyCourses();
  const selected = ids.includes(course.id); // calculado, no va al estado

  return (
    <article className={styles.card}>
      <Badge>{course.category}</Badge>
      {course.seats <= 3 && <Badge warning>Últimas plazas</Badge>}
      <h2 className={styles.title}>{course.title}</h2>
      <p>{course.hours} horas</p>
      <p className={styles.price}>{course.price} €</p>
      <button
        className={selected ? `${styles.button} ${styles.buttonActive}` : styles.button}
        onClick={() => (selected ? remove(course.id) : add(course.id))}
      >
        {selected ? "Quitar de Mis cursos" : "Añadir a Mis cursos"}
      </button>
    </article>
  );
}
