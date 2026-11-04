import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../app/hooks";

type ProtectedRouteProps = {
  role?: "admin" | "student"; // opcional: si se pone, hace falta ese rol
};

export function ProtectedRoute({ role }: ProtectedRouteProps) {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  // Sin sesión: al login, apuntando de dónde venimos
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
