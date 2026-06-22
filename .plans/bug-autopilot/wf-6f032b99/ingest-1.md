# Feedback Ingested — iteration 1

## Comments addressed
| # | File | Change | Status |
|---|------|--------|--------|
| 1 | src/stats.js:32 | Added a `console.warn('median called with an empty array')` message in the empty-input guard of `median()` before throwing, per @vriveras's request. | DONE |

## Commit
c4abba7196739067deae5c255c51a600eba5b633

## Tests
PASS — `node --test`: 13 tests, 4 suites, 0 failures.

Note: the repo's real test runner is `node --test` (package.json `test` script + `node:test` import in `test/stats.test.js`). `npx vitest run` reports "No test suite found" for that file because it is written against `node:test`, not Vitest — this is a pre-existing framework mismatch unrelated to this change (confirmed by stashing the edit and re-running).
