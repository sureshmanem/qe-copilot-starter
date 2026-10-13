import { test as setup, expect } from '@playwright/test';
import { config } from '../src/config';
import { LoginPage } from '../src/pages/LoginPage';

// Runs once before the ui project and saves the signed-in state for every UI test.
setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(config.user.username, config.user.password);
  await expect(page).toHaveURL(/\/dashboard/);
  await page.context().storageState({ path: config.authFile });
});
