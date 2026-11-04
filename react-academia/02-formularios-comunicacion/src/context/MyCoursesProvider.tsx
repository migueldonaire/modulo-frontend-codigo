import { useState } from "react";
import type { ReactNode } from "react";
import { MyCoursesContext } from "./MyCoursesContext";

type MyCoursesProviderProps = {
  children: ReactNode;
};

export function MyCoursesProvider({ children }: MyCoursesProviderProps) {
  const [ids, setIds] = useState<string[]>([]);

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
