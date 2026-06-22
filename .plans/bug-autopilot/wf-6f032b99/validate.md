# Validation — attempt 1

## Gates
| Gate | Result | Notes |
|------|--------|-------|
| build | PASS | No `build` script in package.json (this repo has no build step — `npm run build` reports "Missing script: build"). Treated as N/A → PASS since there is nothing to build. |
| tests | PASS | `node --test` → 13 passed, 0 failed (4 suites). The repo uses Node's built-in `node:test` runner, not Vitest. |
| repro | PASS | `node --test test/bug-repro.test.js` → 1 passed, 0 failed. |

## Failures (if any)
None.

## Notes
- `npm run build` fails with "Missing script: build" — the repo intentionally has no build step (`scripts` only defines `test`). No source compilation is required.
- `npx vitest run` is not applicable: the project uses the built-in `node --test` runner per `repro.md` and `package.json`. The full suite was run with `node --test` instead.

## Recommendation
All gates pass. The fix (even-length branch in `median()` returning `(sorted[mid - 1] + sorted[mid]) / 2`) resolves the repro and introduces no regressions. Route forward to regression-test.
