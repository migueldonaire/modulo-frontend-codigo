import { createContext, useContext } from "react";

// Lo que se comparte
type MyCoursesContextValue = {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
};

// El contexto. Empieza en null: "nadie lo ha provisto"
export const MyCoursesContext = createContext<MyCoursesContextValue | null>(null);

// Un hook propio para leerlo cómodamente
export function useMyCourses() {
  const context = useContext(MyCoursesContext); // lee el contexto
  if (context === null) {
    throw new Error("useMisCursos tiene que usarse dentro de <MisCursosProvider>");
  }
  return context;
}
