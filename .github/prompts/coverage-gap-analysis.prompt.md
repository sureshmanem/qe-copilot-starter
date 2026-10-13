---
description: Find untested acceptance criteria and API operations, and propose tests (no code)
agent: qe-planner
argument-hint: Work item ID or area path
# model: <approved base-tier model>
---
Analyse coverage gaps for **${input:scope:work item ID or area path}**.

1. **Requirements:** read the acceptance criteria of the work item (or of each story under the area path)
   with the Azure DevOps MCP tools. Match them to tests through `@TC<id>` tags and the scenario IDs in `docs/specs/`.
2. **API operations:** read `test-results/api-coverage.json`. If it is missing, ask me to run
   `npm run test:api` and `npm run coverage:api` first.
3. **Prioritise** each gap by risk: business impact and how often that area changes.

Output one table, at most 15 rows, highest risk first:

| Gap | Type (requirement / API) | Risk (H/M/L) | Proposed test, one line | Level (UI/API) |
| --- | --- | --- | --- | --- |

Do not write code.
