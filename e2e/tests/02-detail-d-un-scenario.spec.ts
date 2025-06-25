import { expect, test } from "@playwright/test";

test("displays several Scenarios", async ({ page }) => {
  if (!process.env.WEBSITE_URL) return;
  await page.goto(`${process.env.WEBSITE_URL}/scenarios`);

  await expect(page.locator("li")).toHaveCount(2);
});
