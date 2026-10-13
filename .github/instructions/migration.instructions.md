---
applyTo: "legacy/**,tests/**"
---
# Selenium to Playwright migration rules

Migrate the intent of a test, not its lines.

1. Start by stating in 1 to 3 sentences what the legacy test verifies, and list its assertions.
2. Reuse page objects, clients and factories that already exist in `src/`. Create missing ones following the UI rules.
3. Map legacy constructs:

| Legacy (Java / Python) | Playwright TypeScript |
| --- | --- |
| `WebDriverWait`, `Thread.sleep`, `time.sleep` | Remove. Auto-waiting actions plus `expect` assertions |
| `By.xpath`, `By.cssSelector` | `getByRole`, `getByLabel`, `getByTestId` |
| TestNG/JUnit hooks, pytest fixtures | Fixtures in `src/fixtures` (`test.extend`) |
| `@DataProvider`, `@pytest.mark.parametrize` | `for` loop over a typed data array that defines `test()` cases |
| AssertJ, Hamcrest, `assert` | `expect` (use `expect.soft` for grouped checks) |
| Driver setup/teardown, Grid config | Remove. Handled by Playwright config and workers |
| Screenshot listeners | Remove. `trace`, `screenshot`, `video` are set in config |
| UI login in every test | `storageState` from the setup project |

4. Keep every business assertion. If you drop or change one, list it with the reason.
5. Add `// migrated-from: <legacy path>#<method>` above each migrated test.
6. Mark anything you could not map with `// TODO(migration): <what and why>` and list it in your response.
