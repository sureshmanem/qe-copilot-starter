import { faker } from '@faker-js/faker';
import { config } from '../config';

// Seeded so a failing run can be reproduced with the same TEST_SEED.
faker.seed(config.seed);

let counter = 0;

/** Unique across parallel workers and across runs, for emails, usernames and external IDs. */
export function uniqueSuffix(): string {
  counter += 1;
  const worker = process.env.TEST_PARALLEL_INDEX ?? '0';
  return `${Date.now().toString(36)}${worker}${counter}`;
}

export { faker };
