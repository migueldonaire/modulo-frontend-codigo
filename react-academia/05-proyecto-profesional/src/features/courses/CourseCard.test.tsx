import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CourseCard } from "./CourseCard";
import { renderWithProviders } from "../../test/renderWithProviders";
import type { Course } from "../../app/api";

const course: Course = {
  id: "5",
  title: "Excel avanzado",
  category: "Ofimática",
  hours: 25,
  price: 90,
  seats: 2,
  description: "",
};

describe("CourseCard", () => {
  it("muestra el título, el precio y el aviso de últimas plazas", () => {
    renderWithProviders(<CourseCard course={course} />);

    expect(screen.getByRole("link", { name: "Excel avanzado" })).toHaveAttribute(
      "href",
      "/courses/5",
    );
    expect(screen.getByText(/90,00/)).toBeInTheDocument();
    expect(screen.getByText("Últimas plazas")).toBeInTheDocument();
  });

  it("añade el curso a Mis cursos al pulsar el botón", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<CourseCard course={course} />);

    await user.click(screen.getByRole("button", { name: "Añadir a Mis cursos" }));

    expect(store.getState().myCourses.ids).toEqual(["5"]);
    expect(screen.getByRole("button", { name: "Quitar de Mis cursos" })).toBeInTheDocument();
  });
});
