import { expect, test } from "@playwright/test";

//Si je veux que les tests de ce fichier soient appelés en serie lputot qu'en parallele
test.describe.configure({ mode: "serial" });

let userName = "";
// Avant d'executer ce fichier, j'appelle *une* fois cette fonction
test.beforeAll(async () => {
  userName = `user_${Date.now()}`;
});

test("displays a signin form", async ({ page }) => {
  if (!process.env.WEBSITE_URL) return;
  await page.goto(`${process.env.WEBSITE_URL}/auth`);

  await page.getByRole("tab", { name: "S'inscrire" }).click();
  await expect(page.getByRole("textbox", { name: "email" })).toBeVisible();
});

test("can sign a new user up", async ({ page }) => {
  if (!process.env.WEBSITE_URL) return;
  await page.goto(`${process.env.WEBSITE_URL}/auth`);

  await page.getByRole("tab", { name: "S'inscrire" }).click();
  await page.getByLabel("Nom d'utilisateur").fill(userName);
  await page.getByLabel("Adresse email").fill(`${userName}@spamland.com`);
  await page.getByLabel("Password").fill("toto");
  await page.getByRole("button", { name: "S'inscrire" }).click();
  await expect(page.getByText(`You're logged in as ${userName}`)).toBeVisible();
});

test("cannot sign up the same user twice", async ({ page }) => {
  if (!process.env.WEBSITE_URL) return;
  await page.goto(`${process.env.WEBSITE_URL}/auth`);

  await page.getByRole("tab", { name: "S'inscrire" }).click();
  await page.getByLabel("Nom d'utilisateur").fill(userName);
  await page.getByLabel("Adresse email").fill(`${userName}@spamland.com`);
  await page.getByLabel("Password").fill("toto");
  await page.getByRole("button", { name: "S'inscrire" }).click();

  await expect(
    page.getByText(`You're logged in as ${userName}`),
  ).not.toBeVisible();
  await expect(page.getByText("An error occured")).toBeVisible();
});
