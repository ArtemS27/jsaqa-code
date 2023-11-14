const { test, expect } = require("@playwright/test");
const { email, password } = require("../user.js");

test("Login netology.ru valid user", async ({ page }) => {
  await page.goto("http://netology.ru");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshots/screenshot_1.1.png" });
  await page.click("text=Войти");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshots/screenshot_1.2.png" });
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', email);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('[data-testid="login-submit-btn"]');
  const title = page.getByText("Моё обучение");
  await expect(title).toBeVisible();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "screenshots/screenshot_1.3.png" });
});
test("Login netology.ru invalid user", async ({ page }) => {
  await page.goto("http://netology.ru");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshots/screenshot_2.1.png" });
  await page.click("text=Войти");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshots/screenshot_2.2.png" });
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', "email@mail.ru");
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', "password");
  await page.click('[data-testid="login-submit-btn"]');
  const error = page.getByTestId("login-error-hint");
  await expect(error).toBeVisible();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshots/screenshot_2.3.png" });
});
