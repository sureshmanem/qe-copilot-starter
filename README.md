# QE Copilot Starter Kit

Playwright TypeScript framework plus GitHub Copilot customization for QE teams on Azure DevOps.
It puts the [QE Engineering Playbook: VS Code + GitHub Copilot](docs/PLAYBOOK.md) into practice.
Read the playbook first: it explains the workflow, gates, credit budget and rollout plan that these files implement.

## What's inside

| Area | Files |
| --- | --- |
| Copilot context | `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md`, `AGENTS.md` |
| Prompt files (`/name` in Chat) | `test-plan-from-work-item`, `generate-page-object`, `generate-api-tests`, `generate-test-data-factory`, `migrate-selenium-test`, `triage-flaky-test`, `coverage-gap-analysis` |
| Custom agents | `qe-planner` (read-only) → `qe-implementer` (edit + terminal) → `qe-reviewer` (read-only), linked by handoff buttons |
| VS Code | `.vscode/mcp.json` (Playwright + Azure DevOps MCP), `settings.json` (terminal allow-list), `extensions.json` |
| Framework | `playwright.config.ts`, `src/config.ts`, `src/fixtures`, `src/pages`, `src/api`, `src/data` |
| Examples | `tests/auth.setup.ts`, `tests/ui/login.spec.ts`, `tests/api/users.api.spec.ts`, `api-specs/openapi.yaml` |
| CI and coverage | `azure-pipelines.yml`, `scripts/api-coverage.ts`, `.azuredevops/pull_request_template.md` |
| Specs | `docs/specs/_TEMPLATE.md` |
| Playbook | `docs/PLAYBOOK.md`, `docs/images/` |

## Setup

1. Copy this folder into a new Azure Repos repository.
2. In `.npmrc`, point `registry` at your Azure Artifacts feed (with npmjs as an upstream source).
3. Install dependencies and a browser:

   ```bash
   npm ci
   ```

   ```bash
   npx playwright install chromium
   ```

4. Copy `.env.example` to `.env` and fill in the values for your environment. Secrets stay in your vault.
5. Open the folder in VS Code and install the recommended extensions.
6. Start the MCP servers from `.vscode/mcp.json` (VS Code prompts for your Azure DevOps organization;
   the Azure DevOps server signs you in with Microsoft Entra on first use).
7. Replace the sample `LoginPage`, `UsersClient`, tests and `api-specs/openapi.yaml` with your application's.

## Daily workflow

1. Pick the **qe-planner** agent and run `/test-plan-from-work-item 12345`.
2. Click **Save spec for Gate 1 review**. A QE Lead sets `Status: Approved` in the spec.
3. Pick **qe-implementer**: "Implement docs/specs/12345-....md".
4. Click **Self-review the changes**, fix the findings, then open the PR.

## Commands

| Task | Command |
| --- | --- |
| Typecheck / lint | `npm run typecheck` / `npm run lint` |
| All tests / UI / API / smoke | `npm test` / `npm run test:ui` / `npm run test:api` / `npm run test:smoke` |
| Flakiness check | `npx playwright test <file> --repeat-each=3` |
| API endpoint coverage | `npm run coverage:api -- --min 80` (after API tests have run) |
| HTML report | `npm run report` |

## Things to adjust for your tenant

- **Models:** each prompt and agent has a commented `# model:` line. Replace it with the model your admin approved for that tier.
- **Tool names:** VS Code renames built-in agent tools between releases. If an agent file flags an unknown tool,
  open it and use the **Configure Tools** picker to select the equivalents.
- **MCP versions:** replace `@latest` in `.vscode/mcp.json` with the versions published in your internal feed.
- **Pipeline:** create the `qe-automation` variable group (linked to Key Vault) and add the pipeline as a
  Build Validation policy on `main`.
- **Test Plans:** to link results to test cases, add a Playwright Azure DevOps reporter from your feed
  that maps `@TC<id>` tags to test case IDs.
