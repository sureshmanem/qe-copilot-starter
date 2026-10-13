---
applyTo: "tests/ui/**,src/pages/**"
---
# UI automation rules

## Locators, in this order
1. `page.getByRole(role, { name })`
2. `getByLabel`, `getByPlaceholder`, `getByText`
3. `getByTestId` (attribute `data-testid`)
4. CSS only with a `// why:` comment. No XPath.

If no stable locator exists, say so and recommend a `data-testid` for the dev team.

## Page objects
- One class per page or reusable component, extending `BasePage` (see `src/pages/LoginPage.ts`).
- Locators are `readonly` properties assigned in the constructor.
- Methods express user intent (`login(user)`, `addToCart(sku)`), not single clicks.
- No assertions. Expose locators so specs can assert.
- Register new page objects as fixtures in `src/fixtures/index.ts`.

## Specs
- Arrange data with fixtures and factories, act through page objects, assert in the spec.
- Use `test.step()` for journeys with more than three actions.
- Authentication comes from the `setup` project's `storageState`. Only log in through the UI when testing login.
- Before opening a PR: `npx playwright test <file> --repeat-each=3` must pass.
