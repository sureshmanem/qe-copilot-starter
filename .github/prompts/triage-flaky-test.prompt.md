---
description: Find the root cause of a flaky Playwright test and fix it properly
agent: qe-implementer
argument-hint: Test file and title, plus the failure log or trace summary
# model: <approved standard premium model>
---
Triage the flaky test **${input:test:file and test title}**.

1. Read the test and the page objects, fixtures and factories it uses.
2. Read the failure evidence I attached (error message, trace summary, pipeline log).
3. Reproduce: `npx playwright test <file> -g "<title>" --repeat-each=10 --workers=4`.
4. Classify the root cause as one of: locator or timing, test data collision, shared state or order dependency,
   environment or backend instability, genuine product bug.
5. Apply the smallest fix that removes the cause. Never add waits, retries or longer timeouts to hide it.
   If it is a product bug, do not change the test: draft a bug report (steps, expected, actual, evidence) instead.
6. Verify with `--repeat-each=10` again.

Report: root cause, evidence, fix, and the verification result (passes out of runs).
