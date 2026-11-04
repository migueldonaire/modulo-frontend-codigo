import { Outlet } from "react-router";
import { Header } from "./Header";

export function Layout() {
  return (
    <>
      <Header /> {/* en todas las páginas */}
      <main>
        <Outlet /> {/* aquí se pinta la página que toca según la URL */}
      </main>
    </>
  );
}
