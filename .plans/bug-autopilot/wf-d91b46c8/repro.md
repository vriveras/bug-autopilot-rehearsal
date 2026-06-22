# Bug Reproduction

## Repro method
Test file (uses the project's existing `node:test` runner — the repo does not use Vitest).

## Repro file path
test/bug-repro.test.js

## Command to reproduce
node --test test\bug-repro.test.js

## Observed behavior (failure output)
```
▶ median even-length bug repro
  ✖ averages the two middle elements for even-length arrays (1.2193ms)
  ✖ averages the two middle elements for a two-element array (0.1523ms)
  ✔ still returns the correct value for odd-length arrays (0.0891ms)
✖ median even-length bug repro
ℹ tests 3
ℹ pass 1
ℹ fail 2

✖ averages the two middle elements for even-length arrays
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
  3 !== 2.5
  actual: 3, expected: 2.5, operator: 'strictEqual'

✖ averages the two middle elements for a two-element array
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
  2 !== 1.5
  actual: 2, expected: 1.5, operator: 'strictEqual'
```
Process exit code: 1 (non-zero).

## Expected behavior
For even-length arrays, `median()` should return the average of the two middle
elements:
- `median([1, 2, 3, 4]) === 2.5`
- `median([1, 2]) === 1.5`
Odd-length arrays should continue to return the single middle element
(`median([3, 1, 2]) === 2`), which already passes.

## Root cause hypothesis (refined)
Confirmed. In `src/stats.js`, `median()` computes `mid = Math.floor(sorted.length / 2)`
and unconditionally returns `sorted[mid]` (line 34). For even-length input `mid`
points at the upper of the two middle elements, so the function returns that single
value (3 for `[1,2,3,4]`, 2 for `[1,2]`) instead of the average of `sorted[mid - 1]`
and `sorted[mid]`. The fix is to add an even-length branch:
`return (sorted[mid - 1] + sorted[mid]) / 2` when `sorted.length` is even.
