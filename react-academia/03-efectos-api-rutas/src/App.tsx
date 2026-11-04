import { createBrowserRouter, RouterProvider } from "react-router";
import { MyCoursesProvider } from "./context/MyCoursesProvider";
import { Layout } from "./components/Layout";
import { CatalogPage } from "./pages/CatalogPage";
import { CoursePage } from "./pages/CoursePage";
import { MyCoursesPage } from "./pages/MyCoursesPage";
import { EnrollmentPage } from "./pages/EnrollmentPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// La lista de rutas: qué componente va con cada dirección
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // el layout envuelve a todas las páginas de dentro
    children: [
      { index: true, element: <CatalogPage /> }, // la página de "/"
      { path: "courses/:id", element: <CoursePage /> }, // :id = un parámetro
      { path: "my-courses", element: <MyCoursesPage /> },
      { path: "enrollment", element: <EnrollmentPage /> },
      { path: "*", element: <NotFoundPage /> }, // cualquier otra dirección
    ],
  },
]);

function App() {
  return (
    <MyCoursesProvider>
      <RouterProvider router={router} />
    </MyCoursesProvider>
  );
}

export default App;
