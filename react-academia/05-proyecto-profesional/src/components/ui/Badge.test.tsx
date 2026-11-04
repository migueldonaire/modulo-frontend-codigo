import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("muestra el texto que recibe", () => {
    render(<Badge>Programación</Badge>);

    expect(screen.getByText("Programación")).toBeInTheDocument();
  });
});
