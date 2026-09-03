import { expect, test } from "@playwright/test";

test("redirects the root route to the default English locale", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("heading", { name: "Atlazora" })).toBeVisible();
});

test("renders the Arabic locale with RTL document direction", async ({ page }) => {
  await page.goto("/ar");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByText("العربية")).toBeVisible();
  await expect(page.getByRole("heading", { name: "أطلسورا" })).toBeVisible();
});
