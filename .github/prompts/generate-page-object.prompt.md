---
description: Create or update a Playwright page object
agent: qe-implementer
argument-hint: Page name and route, e.g. Checkout /checkout
# model: <approved standard premium model>
---
Create a page object for **${input:pageName:Page or component name}** at route `${input:route:/route}`.

1. If the Playwright MCP browser tools are available, open the route on the configured BASE_URL and read the accessibility snapshot.
   Otherwise ask me for the page HTML or a screenshot.
2. Follow [LoginPage.ts](../../src/pages/LoginPage.ts) as the pattern and extend `BasePage`.
3. Define locators as `readonly` properties using the locator order in `playwright-ui.instructions.md`.
   When the browser is available, confirm each locator matches exactly one element.
4. Add intent-level methods for the actions the approved spec needs. No assertions.
5. Register the page object as a fixture in `src/fixtures/index.ts`.
6. Run `npm run typecheck` and `npm run lint`.

Report: files changed, locators you could not confirm, and `data-testid` attributes you recommend the dev team add.
