import { expect, test } from "@playwright/test";

test("supports keyboard focus on the foundation action", async ({ page }) => {
  await page.goto("/en");

  const action = page.getByRole("button", { name: "Continue" });

  await page.keyboard.press("Tab");
  await expect(action).toBeFocused();
});

test("uses the same accessible primitive in RTL presentation", async ({ page }) => {
  await page.goto("/ar");

  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("button")).toBeVisible();
});
