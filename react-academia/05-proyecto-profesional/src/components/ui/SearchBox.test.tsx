import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBox } from "./SearchBox";

describe("SearchBox", () => {
  it("avisa al padre de cada letra que se escribe", async () => {
    const user = userEvent.setup();
    const onTextChange = vi.fn();
    render(<SearchBox text="" onTextChange={onTextChange} />);

    await user.type(screen.getByLabelText("Buscar curso"), "sql");

    // Tres letras, tres avisos
    expect(onTextChange).toHaveBeenCalledTimes(3);
  });
});
