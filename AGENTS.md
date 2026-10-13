# AGENTS.md

Playwright + TypeScript test automation. Coding standards live in `.github/copilot-instructions.md`
and `.github/instructions/`. Read them before changing code.

## Setup
- `npm ci` (packages come from the Azure Artifacts feed configured in `.npmrc`)
- `npx playwright install chromium`
- `cp .env.example .env` and fill in non-secret values; secrets come from the pipeline or Key Vault

## Commands
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- One file: `npx playwright test tests/ui/login.spec.ts`
- Flakiness check before a PR: `npx playwright test <file> --repeat-each=3`
- Smoke suite: `npm run test:smoke`
- API endpoint coverage (after API tests ran): `npm run coverage:api`

## Definition of done
- Implements every scenario of an approved spec in `docs/specs/`
- Typecheck and lint are clean
- New or changed tests pass three times in a row locally
- Every test has a suite tag and an `@TC<id>` tag
- No hard waits, no secrets, no `test.only`

## Boundaries
- Do not edit `.github/**`, `.vscode/**` or `azure-pipelines.yml` unless the task asks for it.
- Do not add npm dependencies without stating it in the PR description.
