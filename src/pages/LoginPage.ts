import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly signIn: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page, '/login');
    this.username = page.getByLabel('Username');
    this.password = page.getByLabel('Password');
    this.signIn = page.getByRole('button', { name: 'Sign in' });
    this.error = page.getByRole('alert');
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signIn.click();
  }
}
