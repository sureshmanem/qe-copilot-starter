---
description: Draft a test spec from an Azure Boards work item (no code)
agent: qe-planner
argument-hint: Azure Boards work item ID, e.g. 12345
# model: <approved base-tier model>
---
Draft a test spec for Azure Boards work item **${input:workItemId:Work item ID}**.

1. Read the work item, its acceptance criteria, linked items and any existing test cases with the Azure DevOps MCP tools.
   If Azure DevOps is not reachable, ask me to paste the story and acceptance criteria.
2. Search the repo for page objects, API clients, factories and tests that already cover parts of this story.
3. Fill in [the spec template](../../docs/specs/_TEMPLATE.md) in chat:
   - one scenario per acceptance criterion at minimum, plus negative and boundary scenarios
   - test level for each scenario (API wherever the behaviour can be checked without the UI)
   - priority (P1 to P3), test data needs, environment dependencies, risks
   - `Status: Draft`
4. Propose the file name `docs/specs/<work-item-id>-<short-name>.md`.
5. Do not write test code.

Finish with open questions for the QE Lead, then offer the "Save spec for Gate 1 review" handoff.
