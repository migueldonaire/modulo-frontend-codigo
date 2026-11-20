import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "../../app/hooks";
import { useGetMeQuery } from "../../services/api";

// El usuario que ha entrado, o undefined si no hay sesión.
// Vive en la caché de RTK Query (en memoria), nunca en localStorage.
export function useCurrentUser() {
  const token = useAppSelector((state) => state.auth.token);
  // skipToken: sin token no hay nadie a quien preguntar, no se hace la petición
  const { data, isLoading } = useGetMeQuery(token ?? skipToken);
  // Al cerrar sesión, RTK Query aún recuerda el último usuario: sin token, no hay usuario
  const user = token ? data : undefined;
  return { token, user, isLoading };
}
