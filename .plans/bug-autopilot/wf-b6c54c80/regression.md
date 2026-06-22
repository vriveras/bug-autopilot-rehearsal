# Regression Test

## Test file
test/median-even-length.regression.test.js

## Test name
`describe('median even-length regression')` →
- `it('averages the two middle elements for an even-length array')`
- `it('returns 1.5 for the length-2 array [1, 2]')`
- `it('averages the middle pair regardless of input order')`
- `it('still returns the middle element for an odd-length array')`

## What it tests
Verifies that `median()` returns the average of the two middle elements for
even-length arrays (`median([1,2,3,4]) === 2.5`, `median([1,2]) === 1.5`),
including when the input is unsorted, while preserving correct odd-length
behavior — the exact scenario that triggered the seeded median bug.

## Verification
- Passes with fix: YES (4/4 tests pass; full suite 16/16)
- Fails without fix: YES — temporarily reverted `median()` to the buggy
  `return sorted[mid];`, ran the test (3/4 failed: `3 !== 2.5`, `2 !== 1.5`,
  `3 !== 2.5`), then restored the fix via `git checkout src/stats.js`.

## Notes
- Framework: the stage template references Vitest, but this repo actually uses
  Node's built-in test runner (`node:test`, `node --test` per package.json) and
  has Vitest neither installed nor configured. To respect real repo conventions
  and avoid adding a new test toolchain, the regression test uses `node:test` /
  `node:assert/strict`, matching the existing `test/stats.test.js`.
- The ad-hoc repro `test/bug-repro.test.js` (Stage 2) was removed; its coverage
  is fully subsumed by this permanent, descriptively-named regression test.
- Run command: `node --test test/median-even-length.regression.test.js`
