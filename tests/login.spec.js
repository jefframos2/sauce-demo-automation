import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(
    page.locator('[data-test="primary-header"] .app_logo'),
  ).toHaveText('Swag Labs');
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('Login with invalid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('test');
  await page.locator('[data-test="password"]').fill('test123');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});
