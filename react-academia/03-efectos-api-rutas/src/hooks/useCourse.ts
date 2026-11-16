import { useEffect, useState } from "react";
import { getCourse } from "../services/coursesService";
import type { Course } from "../services/coursesService";

export function useCourse(id: string) {
  const [course, setCourse] = useState<Course | null>(null); // todavía no hay curso
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getCourse(id)
      .then((data) => {
        if (!cancelled) setCourse(data);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]); // si cambia el id, se pide otro curso

  return { course, loading, error };
}
