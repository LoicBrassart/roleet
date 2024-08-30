import { expect, test } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

test("Go to home page", async ({ page }) => {
  if (!process.env.WEBSITE_URL) return;
  await page.goto(process.env.WEBSITE_URL);

  await page.waitForLoadState("networkidle");
  await expect(page.getByText("Tous les utilisateurs")).toBeVisible();
});
