import { Navigate, Outlet, useLocation } from "react-router";
import { useCurrentUser } from "./useCurrentUser";

type ProtectedRouteProps = {
  role?: "admin" | "student"; // opcional: si se pone, hace falta ese rol
};

export function ProtectedRoute({ role }: ProtectedRouteProps) {
  const { token, user, isLoading } = useCurrentUser();
  const location = useLocation();

  // Sin sesión: al login, apuntando de dónde venimos
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Hay token, pero /me todavía no ha contestado
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  // /me ha fallado: el token no vale
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Con sesión pero sin el rol
  if (role && user.role !== role) {
    return <p className="error">No tienes permiso para ver esta página.</p>;
  }

  // Todo bien: pinta la página de dentro
  return <Outlet />;
}
