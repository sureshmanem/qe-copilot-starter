import { test, expect } from '../../src/fixtures';
import { config } from '../../src/config';
import { UsersClient, type NewUser, type User } from '../../src/api/UsersClient';
import { buildUser, invalidUsers } from '../../src/data/factories/userFactory';

test.describe('Users API', () => {
  test('SC-10 create user returns 201 and the new user', { tag: ['@smoke', '@TC2001'] }, async ({ usersApi, trackUser }) => {
    const input = buildUser();

    const response = await usersApi.create(input);

    expect(response.status()).toBe(201);
    const body = (await response.json()) as User;
    trackUser(body.id);
    expect(body).toMatchObject(input);
  });

  test('SC-11 get user by id returns the user', { tag: ['@regression', '@TC2002'] }, async ({ usersApi, createdUser }) => {
    const response = await usersApi.get(createdUser.id);

    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({ id: createdUser.id, email: createdUser.email });
  });

  test('SC-12 unknown user id returns 404', { tag: ['@regression', '@TC2003'] }, async ({ usersApi }) => {
    const response = await usersApi.get('does-not-exist');

    expect(response.status()).toBe(404);
  });

  test('SC-13 request without a token returns 401', { tag: ['@regression', '@TC2004'] }, async ({ request }) => {
    const anonymous = new UsersClient(request, config.apiBaseUrl, '');

    const response = await anonymous.list();

    expect(response.status()).toBe(401);
  });

  for (const { reason, data } of invalidUsers) {
    test(`SC-14 create user rejects ${reason}`, { tag: ['@regression', '@TC2005'] }, async ({ usersApi }) => {
      const response = await usersApi.create({ ...buildUser(), ...data } as NewUser);

      expect([400, 422]).toContain(response.status());
    });
  }
});
