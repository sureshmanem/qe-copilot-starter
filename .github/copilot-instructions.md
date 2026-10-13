# Copilot instructions: QE automation

## Stack and layout
- Playwright Test with TypeScript (strict mode), Node 20+.
- UI tests: `tests/ui/*.spec.ts`. API tests: `tests/api/*.api.spec.ts`.
- Page objects: `src/pages`. API clients: `src/api`. Data factories: `src/data/factories`. Fixtures: `src/fixtures`.
- Spec files import `test` and `expect` from `src/fixtures`, never directly from `@playwright/test`.
- Configuration comes from `src/config.ts` (environment variables). Never hard-code URLs, users or tokens.

## Always
- Implement only from a spec in `docs/specs/` whose status is `Approved`. Put the scenario ID in the test title.
- Tag every test with one suite tag and its Azure Test Plans case ID when known:
  `test('SC-01 user signs in', { tag: ['@smoke', '@TC1001'] }, async ({ ... }) => { ... })`
- Use web-first assertions: `await expect(locator).toBeVisible()`.
- Keep tests independent: each test creates its own data through fixtures and can run in parallel.
- Give every public method explicit TypeScript types.
- After changes, run `npm run typecheck`, `npm run lint` and the affected tests.

## Never
- `page.waitForTimeout`, sleeps, or retry loops that hide failures.
- XPath, or CSS chains without a `// why:` comment explaining why role, label or test id cannot work.
- `expect` inside page objects.
- Secrets, tokens or real customer data in code, comments or prompts.
- `test.only`, or `test.skip` without a linked work item ID.
- New npm dependencies without stating them explicitly in your response.

## When you finish
List: files changed, commands run and their results, assumptions made, and anything you could not verify.
