import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button, Surface, TextLink } from "@/components/ui";

describe("Atlazora design system foundation", () => {
  it("renders an accessible button with a safe default type", () => {
    render(<Button>Continue</Button>);

    const button = screen.getByRole("button", { name: "Continue" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("atlazora-button");
  });

  it("supports keyboard focus for interactive primitives", async () => {
    const user = userEvent.setup();

    render(
      <>
        <Button>Continue</Button>
        <TextLink href="#details">Details</TextLink>
      </>,
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "Continue" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("link", { name: "Details" })).toHaveFocus();
  });

  it("renders the surface primitive without imposing domain semantics", () => {
    render(<Surface data-testid="surface">Content</Surface>);

    expect(screen.getByTestId("surface")).toHaveClass("atlazora-surface");
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
