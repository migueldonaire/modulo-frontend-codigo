import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loggedOut } from "../features/auth/authSlice";

export function Header() {
  const amount = useAppSelector((state) => state.myCourses.ids.length);
  const user = useAppSelector((state) => state.auth.user); // null si no ha entrado
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(loggedOut());
    navigate("/");
  }

  return (
    <header className="header">
      <strong>Academia</strong>
      <nav>
        <NavLink to="/" end>
          Cursos
        </NavLink>
        <NavLink to="/my-courses">Mis cursos ({amount})</NavLink>
        {/* Admin solo para el rol admin */}
        {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
        {user ? (
          <>
            <span>Hola, {user.name}</span>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <NavLink to="/login">Entrar</NavLink>
        )}
      </nav>
    </header>
  );
}
