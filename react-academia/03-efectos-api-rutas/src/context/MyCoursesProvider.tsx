import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { MyCoursesContext } from "./MyCoursesContext";

type MyCoursesProviderProps = {
  children: ReactNode;
};

// Lee lo guardado. Si no hay nada, un array vacío
function loadSavedIds(): string[] {
  return JSON.parse(localStorage.getItem("myCourses") ?? "[]");
}

export function MyCoursesProvider({ children }: MyCoursesProviderProps) {
  // Le pasamos la función SIN paréntesis: React solo la llama la primera vez
  const [ids, setIds] = useState<string[]>(loadSavedIds);

  // Cada vez que cambian los ids, se guardan
  useEffect(() => {
    localStorage.setItem("myCourses", JSON.stringify(ids));
  }, [ids]);

  function add(id: string) {
    // Si ya está, no lo repite
    setIds((previous) => (previous.includes(id) ? previous : [...previous, id]));
  }

  function remove(id: string) {
    setIds((previous) => previous.filter((x) => x !== id));
  }

  // Todo lo que esté dentro (children) puede leer ids, anadir y quitar
  return <MyCoursesContext value={{ ids, add, remove }}>{children}</MyCoursesContext>;
}
