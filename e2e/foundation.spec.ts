import { expect, test } from "@playwright/test";

test("serves the Atlazora Web foundation", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Atlazora/i);
  await expect(page.locator("body")).toContainText("Atlazora");
});
