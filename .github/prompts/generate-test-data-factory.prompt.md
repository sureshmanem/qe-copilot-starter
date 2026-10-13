---
description: Generate a seeded test data factory with negative and boundary variants
agent: qe-implementer
argument-hint: Attach the TypeScript type or OpenAPI schema
# model: <approved base-tier model>
---
Create a test data factory for **${input:entity:Entity name}** from the attached type or schema.

1. Follow [userFactory.ts](../../src/data/factories/userFactory.ts) and `test-data.instructions.md`.
2. `build<Entity>(overrides = {})` returns a valid object. Use `faker` from `src/data/faker.ts`,
   and `uniqueSuffix()` in every field that must be unique.
3. Export `invalid<Entity>s`: one entry per validation rule in the schema (required, format, enum, length, range),
   each with a `reason`.
4. Export `boundary<Entity>s`: the exact minimum and maximum valid values for each constrained field.
5. Run `npm run typecheck`.

Report the rules you derived from the schema and any rule you had to assume.
