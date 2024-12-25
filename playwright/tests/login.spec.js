import { test, expect } from '@playwright/test';

test('Success case with login', async ({ page }) => {
  await page.goto('http://ui:80/');
  await page.getByLabel('Username').fill('demo01');
  await page.getByLabel('Password').fill('demo01password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});