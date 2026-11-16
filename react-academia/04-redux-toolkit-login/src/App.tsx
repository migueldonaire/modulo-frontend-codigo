import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CatalogPage } from "./pages/CatalogPage";
import { CoursePage } from "./pages/CoursePage";
import { MyCoursesPage } from "./pages/MyCoursesPage";
import { EnrollmentPage } from "./pages/EnrollmentPage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <CatalogPage /> },
      { path: "courses/:id", element: <CoursePage /> },
      { path: "my-courses", element: <MyCoursesPage /> },
      { path: "login", element: <LoginPage /> },
      {
        element: <ProtectedRoute />, // hace falta sesión
        children: [{ path: "enrollment", element: <EnrollmentPage /> }],
      },
      {
        element: <ProtectedRoute role="admin" />, // hace falta ser admin
        children: [{ path: "admin", element: <AdminPage /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
