import { expect, test } from "@playwright/test";

test("PWright works!", async ({ page }) => {
  await page.goto(process.env.WEBSITE_URL);

  await expect(page).toHaveTitle(/Roleet/);
});
