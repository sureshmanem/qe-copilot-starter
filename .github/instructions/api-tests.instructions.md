---
applyTo: "tests/api/**,src/api/**"
---
# API testing rules

- Call services only through `ApiClient` subclasses in `src/api`. The base client records every call to
  `test-results/api-calls.jsonl`, which feeds `npm run coverage:api`. Do not bypass it with raw `request.get()`.
- One client per service. Methods return `APIResponse`. Request and response types live next to the client.
- For each operation, cover where applicable:
  - success (2xx) with key fields asserted
  - validation errors (400/422) for each required field and format rule
  - unauthenticated (401) and forbidden (403)
  - not found (404)
  - boundary values (min/max length, numeric limits, enum values)
  - idempotency for PUT and DELETE
- Assert status, key body fields and the shape defined in `api-specs/openapi.yaml`.
- Clean up created resources through fixture teardown (see `trackUser` in `src/fixtures/index.ts`).
- Test data comes from factories in `src/data/factories`, never inline literals for emails or IDs.
