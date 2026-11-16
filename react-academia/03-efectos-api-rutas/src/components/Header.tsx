import { NavLink } from "react-router";
import { useMyCourses } from "../context/MyCoursesContext";
import { Clock } from "./Clock";

export function Header() {
  const { ids } = useMyCourses();

  return (
    <header className="header">
      <strong>Academia</strong>
      <nav>
        {/* end: activo solo en "/" exacto */}
        <NavLink to="/" end>
          Cursos
        </NavLink>
        <NavLink to="/my-courses">Mis cursos ({ids.length})</NavLink>
        <Clock />
      </nav>
    </header>
  );
}
