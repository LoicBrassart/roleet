import { expect, test } from "@playwright/test";

test("has a homepage", async ({ page }) => {
  if (!process.env.WEBSITE_URL) return;
  await page.goto(process.env.WEBSITE_URL);

  await expect(page).toHaveTitle(/Roleet/);

  const plansLabel = await page.getByText("Plans:").textContent();
  await expect(plansLabel).not.toBeNull();
  if (plansLabel) {
    await expect(Number(plansLabel.split(":")[1])).toBeGreaterThan(0);
  }
});
