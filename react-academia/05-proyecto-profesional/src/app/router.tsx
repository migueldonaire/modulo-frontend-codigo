import { createBrowserRouter } from "react-router";
import { Layout } from "../components/layout/Layout";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import { CatalogPage } from "../features/courses/CatalogPage";
import { CoursePage } from "../features/courses/CoursePage";
import { MyCoursesPage } from "../features/myCourses/MyCoursesPage";
import { EnrollmentPage } from "../features/enrollment/EnrollmentPage";
import { LoginPage } from "../features/auth/LoginPage";
import { AdminPage } from "../features/admin/AdminPage";
import { NotFoundPage } from "../components/layout/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <CatalogPage /> },
      { path: "courses/:id", element: <CoursePage /> },
      { path: "my-courses", element: <MyCoursesPage /> },
      { path: "login", element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "enrollment", element: <EnrollmentPage /> }],
      },
      {
        element: <ProtectedRoute role="admin" />,
        children: [{ path: "admin", element: <AdminPage /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
