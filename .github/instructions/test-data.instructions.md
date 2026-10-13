---
applyTo: "src/data/**"
---
# Test data rules

- Factories are functions `buildX(overrides: Partial<X> = {}): X` (see `src/data/factories/userFactory.ts`).
- Import `faker` from `src/data/faker.ts`. It is seeded from `TEST_SEED` so failures can be reproduced.
- Use `uniqueSuffix()` in every value that must be unique (emails, usernames, external IDs) so parallel workers never collide.
- Emails use the `example.test` domain. Never use real people's details or production data.
- Provide negative and boundary variants as typed arrays with a `reason` field, for data-driven tests:
  `export const invalidUsers: Array<{ reason: string; data: Partial<NewUser> }> = [...]`
