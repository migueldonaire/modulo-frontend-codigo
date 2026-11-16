import { useState } from "react";
import type { Course } from "../services/coursesService";
import { Badge } from "./Badge";
import styles from "./CourseCard.module.css";

type CourseCardProps = {
  course: Course; // una sola prop: el curso completo
};

export function CourseCard({ course }: CourseCardProps) {
  // interested: el valor actual. setInterested: la función para cambiarlo.
  const [interested, setInterested] = useState(false);

  function toggleInterest() {
    setInterested(!interested); // cambia el valor y React vuelve a pintar
  }

  return (
    <article className={styles.card}>
      <Badge>{course.category}</Badge>
      {course.seats <= 3 && <Badge warning>Últimas plazas</Badge>}
      <h2 className={styles.title}>{course.title}</h2>
      <p>{course.hours} horas</p>
      <p className={styles.price}>{course.price} €</p>
      <button
        className={interested ? `${styles.button} ${styles.buttonActive}` : styles.button}
        onClick={toggleInterest}
      >
        {interested ? "Te interesa" : "Me interesa"}
      </button>
    </article>
  );
}
