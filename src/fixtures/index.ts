import { test as base, expect } from '@playwright/test';
import { UsersClient, type User } from '../api/UsersClient';
import { buildUser } from '../data/factories/userFactory';
import { LoginPage } from '../pages/LoginPage';

interface Fixtures {
  loginPage: LoginPage;
  usersApi: UsersClient;
  /** Register a user ID created inside a test; it is deleted after the test. */
  trackUser: (id: string) => void;
  /** A user created through the API before the test and deleted after it. */
  createdUser: User;
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  usersApi: async ({ request }, use) => {
    await use(new UsersClient(request));
  },

  trackUser: async ({ usersApi }, use) => {
    const ids: string[] = [];
    await use((id) => ids.push(id));
    for (const id of ids) {
      await usersApi.remove(id);
    }
  },

  createdUser: async ({ usersApi, trackUser }, use) => {
    const response = await usersApi.create(buildUser());
    expect(response.status(), 'fixture could not create a user').toBe(201);
    const user = (await response.json()) as User;
    trackUser(user.id);
    await use(user);
  },
});

export { expect };
