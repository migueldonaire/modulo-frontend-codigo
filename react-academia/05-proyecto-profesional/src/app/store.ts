import { configureStore } from "@reduxjs/toolkit";
import myCoursesReducer from "../features/myCourses/myCoursesSlice";
import authReducer from "../features/auth/authSlice";
import { api } from "./api";

// Lee una clave de localStorage. Si no hay nada o está mal, undefined
function loadSaved(key: string) {
  try {
    const text = localStorage.getItem(key);
    return text ? JSON.parse(text) : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    myCourses: myCoursesReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer, // la caché de RTK Query
  },
  // Necesario para que RTK Query funcione. Se copia tal cual
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  // Con qué estado arranca el store (si es undefined, usa el initialState)
  preloadedState: {
    myCourses: loadSaved("myCourses"),
    auth: loadSaved("auth"),
  },
});

// Después de cada acción, guarda Mis cursos y la sesión
store.subscribe(() => {
  const { myCourses, auth } = store.getState();
  localStorage.setItem("myCourses", JSON.stringify(myCourses));
  localStorage.setItem("auth", JSON.stringify(auth));
});

// Los tipos del estado y del dispatch, sacados del propio store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
