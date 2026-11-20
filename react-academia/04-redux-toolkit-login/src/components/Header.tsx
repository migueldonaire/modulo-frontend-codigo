import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loggedOut } from "../features/auth/authSlice";
import { useCurrentUser } from "../features/auth/useCurrentUser";
import { api } from "../services/api";

export function Header() {
  const amount = useAppSelector((state) => state.myCourses.ids.length);
  const { user } = useCurrentUser(); // undefined si no ha entrado
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(loggedOut());
    dispatch(api.util.resetApiState()); // olvida la caché: el usuario de /me ya no sirve
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
