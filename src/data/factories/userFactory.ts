import type { NewUser } from '../../api/UsersClient';
import { faker, uniqueSuffix } from '../faker';

export function buildUser(overrides: Partial<NewUser> = {}): NewUser {
  return {
    name: faker.person.fullName(),
    email: `qe.${uniqueSuffix()}@example.test`,
    role: 'member',
    ...overrides,
  };
}

/** One entry per validation rule; drives data-driven negative tests. */
export const invalidUsers: Array<{ reason: string; data: Partial<NewUser> }> = [
  { reason: 'missing email', data: { email: undefined } },
  { reason: 'malformed email', data: { email: 'not-an-email' } },
  { reason: 'empty name', data: { name: '' } },
  { reason: 'name longer than 100 characters', data: { name: 'a'.repeat(101) } },
  { reason: 'unknown role', data: { role: 'owner' as NewUser['role'] } },
];
