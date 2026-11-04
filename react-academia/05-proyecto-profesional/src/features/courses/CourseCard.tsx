import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import type { Course } from "../../app/api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { add, remove } from "../myCourses/myCoursesSlice";
import { Badge } from "../../components/ui/Badge";
import { formatPrice } from "../../i18n/format";
import styles from "./CourseCard.module.css";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const { t, i18n } = useTranslation();
  const selected = useAppSelector((state) => state.myCourses.ids.includes(course.id));
  const dispatch = useAppDispatch();

  return (
    <article className={styles.card}>
      <Badge>{course.category}</Badge>
      {course.seats <= 3 && <Badge warning>{t("course.lastSeats")}</Badge>}
      <h2 className={styles.title}>
        <Link to={`/courses/${course.id}`}>{course.title}</Link>
      </h2>
      <p>{t("course.hours", { hours: course.hours })}</p>
      <p className={styles.price}>{formatPrice(course.price, i18n.language)}</p>
      <button
        className={selected ? `${styles.button} ${styles.buttonActive}` : styles.button}
        onClick={() => dispatch(selected ? remove(course.id) : add(course.id))}
      >
        {selected ? t("course.remove") : t("course.add")}
      </button>
    </article>
  );
}
