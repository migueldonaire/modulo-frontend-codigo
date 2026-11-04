import { useMyCourses } from "../context/MyCoursesContext";

export function Header() {
  const { ids } = useMyCourses(); // lo leemos directamente, sin props

  return (
    <header className="header">
      <strong>Academia</strong>
      <nav>
        <a href="#">Cursos</a>
        <a href="#">Mis cursos ({ids.length})</a>
      </nav>
    </header>
  );
}
