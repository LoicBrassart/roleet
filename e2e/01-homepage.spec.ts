import { expect, test } from "@playwright/test";

test("has a homepage", async ({ page }) => {
  await page.goto("http://localhost:7000/");

  await expect(page).toHaveTitle(/Roleet/);

  const plansLabel = await page.getByText("Plans:").textContent();
  await expect(plansLabel).not.toBeNull();
  await expect(Number(plansLabel.split(":")[1])).toBeGreaterThan(0);
});
