# 🤖 bug-autopilot

## Bug
`median()` returned the wrong value for even-length arrays — e.g. `median([1, 2, 3, 4])` returned `3` instead of `2.5`.

## Root cause
`median()` in `src/stats.js` unconditionally returned `sorted[mid]` where `mid = Math.floor(sorted.length / 2)`. For even-length arrays `mid` is the upper-middle index, so the function returned the upper-middle element instead of the average of the two middle elements.

## Fix
Replaced the unconditional `return sorted[mid];` with a length-parity check: even-length input now returns the average of the two middle elements `(sorted[mid - 1] + sorted[mid]) / 2`, while odd-length input still returns `sorted[mid]`. All other behavior (empty-array throw, sorting, odd-length results) is untouched.

- `src/stats.js` — `median()` now averages the two middle elements for even-length arrays.

## Regression test
`test/median-even-length.regression.test.js` (Node's built-in `node:test` runner, matching repo conventions) covers:
- averages the two middle elements for an even-length array (`median([1,2,3,4]) === 2.5`)
- returns `1.5` for `[1, 2]`
- averages the middle pair regardless of input order
- still returns the middle element for an odd-length array

Verified: passes with the fix (full suite 16/16); fails without it (3/4 fail when `median()` is reverted to the buggy version).

## Review instructions
- Reply to any specific review comment and I'll address it in-thread; I'll post any clarifying questions here in the PR and wait for your reply.
- Comment `/approve` (or 👍) when you're happy and I'll merge.
- Leave review comments or comment `/changes: <feedback>` to request changes — the autopilot will iterate on feedback in-thread and re-push automatically.
