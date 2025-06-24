import { expect, test } from "@playwright/test";

test("displays several Scenarios", async ({ page }) => {
  await page.goto("http://localhost:7000/scenarios");

  await expect(page.locator("li")).toHaveCount(2);
});
