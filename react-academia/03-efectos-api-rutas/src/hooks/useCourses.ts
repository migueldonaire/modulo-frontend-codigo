import { useEffect, useState } from "react";
import { getCourses } from "../services/coursesService";
import type { Course } from "../services/coursesService";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]); // los datos
  const [loading, setLoading] = useState(true); // empieza cargando
  const [error, setError] = useState<string | null>(null); // empieza sin error

  useEffect(() => {
    let cancelled = false; // ¿el componente ya no está?

    getCourses()
      .then((data) => {
        if (!cancelled) setCourses(data); // han llegado los cursos
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message); // algo ha fallado
      })
      .finally(() => {
        if (!cancelled) setLoading(false); // ya no carga, vaya bien o mal
      });

    // Limpieza: si el componente desaparece, no tocamos su estado
    return () => {
      cancelled = true;
    };
  }, []); // solo al abrir

  return { courses, loading, error };
}
