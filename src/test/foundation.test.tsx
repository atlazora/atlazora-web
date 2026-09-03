import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "../app/page";

describe("Web foundation", () => {
  it("renders the Atlazora application identity", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1, name: "Atlazora" })).toBeInTheDocument();
  });
});
