---
description: Generate API tests for one operation from the OpenAPI spec
agent: qe-implementer
argument-hint: Operation, e.g. POST /users
# model: <approved standard premium model>
---
Generate API tests for **${input:operation:METHOD /path}** using [the OpenAPI spec](../../api-specs/openapi.yaml).

1. Read the operation: parameters, request schema, responses and security.
2. Add or extend the client method in `src/api` (follow `UsersClient.ts`).
3. Add or extend a factory in `src/data/factories`, including `invalid…` variants with a `reason` for each validation rule.
4. Write tests in `tests/api/<resource>.api.spec.ts` covering the matrix in `api-tests.instructions.md`.
   Tag each test with `@smoke` or `@regression` and the `@TC<id>` from the approved spec.
5. Register created resources for cleanup through a fixture.
6. Run `npx playwright test tests/api/<file> --project=api`. If the API is not reachable, run `npm run typecheck`
   and say clearly that the tests were not executed.

Report: scenarios covered, response codes in the spec that are still untested, and files changed.
