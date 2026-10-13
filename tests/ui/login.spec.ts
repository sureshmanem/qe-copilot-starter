import { test, expect } from '../../src/fixtures';
import { config } from '../../src/config';

test.describe('Login', () => {
  // These tests exercise login itself, so they start signed out.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('SC-01 registered user signs in and lands on the dashboard', { tag: ['@smoke', '@TC1001'] }, async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(config.user.username, config.user.password);
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('SC-02 wrong password shows an error and stays on login', { tag: ['@regression', '@TC1002'] }, async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(config.user.username, 'wrong-password');
    await expect(loginPage.error).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});
