import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FoundationPage } from "@/components/foundation/foundation-page";
import { defaultLocale, getLocaleDirection, isLocale, locales } from "@/i18n/routing";

describe("Web internationalization foundation", () => {
  it("defines the supported locale contract", () => {
    expect(locales).toEqual(["en", "ar"]);
    expect(defaultLocale).toBe("en");
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("maps English to LTR and Arabic to RTL", () => {
    expect(getLocaleDirection("en")).toBe("ltr");
    expect(getLocaleDirection("ar")).toBe("rtl");
  });

  it("renders the presentation component with accessible content", () => {
    render(
      <FoundationPage
        ariaLabel="Atlazora web foundation"
        title="Atlazora"
        body="Marketplace presentation foundation"
        localeLabel="English"
      />,
    );

    expect(screen.getByRole("main", { name: "Atlazora web foundation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Atlazora" })).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
  });
});
