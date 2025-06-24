import { expect, test } from "@playwright/test";

test("displays a signin form", async ({ page }) => {
  await page.goto("http://localhost:7000/auth");

  await page.getByRole("tab", { name: "S'inscrire" }).click();
  await expect(page.getByRole("textbox", { name: "email" })).toBeVisible();
});

test("can sign a new user up", async ({ page }) => {
  await page.goto("http://localhost:7000/auth");

  await page.getByRole("tab", { name: "S'inscrire" }).click();
  await page.getByLabel("Nom d'utilisateur").fill("lambas");
  await page.getByLabel("Adresse email").fill("lambas@spamland.com");
  await page.getByLabel("Password").fill("toto");
  await page.getByRole("button", { name: "S'inscrire" }).click();
  await expect(page.getByText("You're logged in as lambas")).toBeVisible();
});

test("cannot sign up the same user twice", async ({ page }) => {
  await page.goto("http://localhost:7000/auth");

  await page.getByRole("tab", { name: "S'inscrire" }).click();
  await page.getByLabel("Nom d'utilisateur").fill("lambas");
  await page.getByLabel("Adresse email").fill("lambas@spamland.com");
  await page.getByLabel("Password").fill("toto");
  await page.getByRole("button", { name: "S'inscrire" }).click();

  //TODO Display an error message
  await expect(page.getByText("You're logged in as lambas")).not.toBeVisible();
  await expect(page.getByText("An error occured")).toBeVisible();
});
