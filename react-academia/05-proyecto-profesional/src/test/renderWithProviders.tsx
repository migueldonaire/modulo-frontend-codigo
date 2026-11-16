import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import myCoursesReducer from "../features/myCourses/myCoursesSlice";
import authReducer from "../features/auth/authSlice";
import { api } from "../app/api";

export function renderWithProviders(ui: ReactElement) {
  const store = configureStore({
    reducer: {
      myCourses: myCoursesReducer,
      auth: authReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

  const result = render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );

  return { store, ...result };
}
