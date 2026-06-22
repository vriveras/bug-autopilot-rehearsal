# 🤖 bug-autopilot

## Bug
`median()` in `src/stats.js` returns the wrong value for even-length input arrays: it returns the lower-middle element instead of the average of the two middle elements (e.g. `node bin/stats.js 1 2 3 4` printed `median: 3` instead of `2.5`).

## Root cause
`median()` computed `mid = Math.floor(sorted.length / 2)` and unconditionally returned `sorted[mid]`. It had no even-length branch, so for even-length arrays it returned the lower-middle element (e.g. `3` for `[1,2,3,4]`) instead of averaging the two central elements. The existing test suite only covered odd-length and length-1 cases, which hid the defect.

## Fix
- Added an even-length branch to `median()` that returns `(sorted[mid - 1] + sorted[mid]) / 2` when `sorted.length % 2 === 0`. Odd-length and length-1 behavior is unchanged.
- Added even-length test cases (sorted and unsorted) to `test/stats.test.js` to lock in the behavior and close the test gap.

| File | Change |
|------|--------|
| `src/stats.js` | Added even-length averaging branch in `median()` |
| `test/stats.test.js` | Added even-length median tests (sorted + unsorted) |

## Regression test
- **File:** `test/stats.test.js`
- **Block:** `describe('median even-length regression')`
  - `it('averages the two middle elements instead of returning the lower-middle one (regression: even-length median bug)')`
  - `it('averages the two middle elements for an unsorted even-length array (regression: even-length median bug)')`
- **Covers:** `median()` returning the average of the two central elements for even-length arrays (e.g. `median([1, 2, 3, 4]) === 2.5`), for both sorted and unsorted input — the exact scenario that previously returned the lower-middle element (`3`).
- **Verified:** Passes with the fix (full suite 14 pass, 0 fail); fails without it (reverting the branch yields 4 failures).

> Note: repo uses Node's built-in `node:test` runner (`npm test` → `node --test`), so the regression test was written for `node:test` per repo conventions.

## Review instructions
- Comment `/approve` (or 👍 reaction) to merge
- Leave review comments or comment `/changes: <feedback>` to request changes
- The autopilot will iterate on feedback and re-push automatically
