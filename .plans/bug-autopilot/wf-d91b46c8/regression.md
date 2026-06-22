# Regression Test

## Test file
test/stats.test.js

## Test name
`describe('median')` › `it('averages the two middle elements for even-length arrays — regression')`

## What it tests
Verifies `median()` averages the two middle elements for even-length arrays
(`median([1, 2, 3, 4]) === 2.5`, `median([1, 2]) === 1.5`) while still returning
the single middle element for odd-length arrays (`median([3, 1, 2]) === 2`).

## Verification
- Passes with fix: YES (13/13 tests pass)
- Fails without fix: YES — temporarily removing the even-length branch in
  `src/stats.js` makes this test fail (3 failures), confirming it catches the bug.

## Notes
- The repo uses the built-in `node:test` runner with `node:assert/strict`, NOT
  Vitest. The stage's Vitest instruction does not apply here; the regression test
  follows the existing repo conventions (`import { describe, it } from 'node:test'`,
  ESM, `.js` import extensions) to stay consistent with `test/stats.test.js`.
- The ad-hoc repro file `test/bug-repro.test.js` (Stage 2) was promoted into the
  conventional `test/stats.test.js` median suite and then removed.
- Run command: `node --test test\stats.test.js`.
