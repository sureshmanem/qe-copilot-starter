---
description: Migrate a Selenium (Java or Python) test to Playwright TypeScript
agent: qe-implementer
argument-hint: Attach the legacy test file (and its page objects)
# model: <approved standard premium model; high-reasoning only for custom legacy frameworks>
---
Migrate the attached legacy Selenium test to Playwright TypeScript, following `migration.instructions.md`.

1. **Intent:** state in 1 to 3 sentences what the legacy test verifies, and list every assertion it makes.
2. **Dependencies:** map each legacy page object or helper it uses to an existing equivalent in `src/`.
   List the ones that are missing.
3. **Shared layer first:** create missing page objects, clients or factories.
4. **Spec:** write the new test in `tests/ui` or `tests/api`, with tags and a `// migrated-from:` comment.
5. **Verify:** run `npx playwright test <file> --repeat-each=3` if the environment is reachable,
   otherwise `npm run typecheck`, and say which one you ran.

Finish with a migration report:

| Legacy assertion | New assertion | Status (kept / changed / dropped) | Reason |
| --- | --- | --- | --- |

Then list every `TODO(migration)` and the files changed.
