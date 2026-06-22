# Regression Test

## Test file
test/stats.test.js

## Test name
`describe('median even-length regression')`
- `it('averages the two middle elements instead of returning the lower-middle one (regression: even-length median bug)')`
- `it('averages the two middle elements for an unsorted even-length array (regression: even-length median bug)')`

## What it tests
That `median()` returns the average of the two central elements for even-length
arrays (e.g. `median([1, 2, 3, 4]) === 2.5`), both for already-sorted and unsorted
input — the exact scenario that previously returned the lower-middle element (`3`).

## Verification
- Passes with fix: YES (full suite 14 pass, 0 fail)
- Fails without fix: YES — temporarily reverting the even-length branch in
  `src/stats.js` makes both regression cases fail (10 pass, 4 fail), then the
  source was restored and the suite returns to 14 pass, 0 fail.

## Notes
- **Test runner deviation:** The stage instructions specified Vitest, but this repo
  has no Vitest dependency. `package.json` defines `"test": "node --test"` and all
  existing tests use Node's built-in `node:test` runner with `node:assert/strict`.
  To follow the actual repo conventions (and keep the suite runnable), the
  regression test was written for `node:test`, not Vitest.
- Run command: `node --test test/stats.test.js` (or `npm test` for the full suite).
- The ad-hoc repro from Stage 2 (`test/bug-repro.test.js`) was removed; its coverage
  is now fully captured by the named regression block in the conventional
  `test/stats.test.js` location (sibling tests for `src/stats.js`).
