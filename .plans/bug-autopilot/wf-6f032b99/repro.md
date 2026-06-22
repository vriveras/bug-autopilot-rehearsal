# Bug Reproduction

## Repro method
test file (Node's built-in `node:test` runner — the repo uses `node --test`, not Vitest)

## Repro file path
test/bug-repro.test.js

## Command to reproduce
node --test test/bug-repro.test.js

## Observed behavior (failure output)
```
▶ median even-length bug repro
  ✖ averages the two middle elements for even-length array
✖ median even-length bug repro
ℹ tests 1
ℹ pass 0
ℹ fail 1

✖ failing tests:

test at test\bug-repro.test.js:6:3
✖ averages the two middle elements for even-length array
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:

  3 !== 2.5

    actual: 3,
    expected: 2.5,
    operator: 'strictEqual',
```
`median([1, 2, 3, 4])` returns `3` (the lower-middle element, `sorted[mid]`) instead of `2.5`.

## Expected behavior
For an even-length array, `median()` should return the average of the two middle
elements: `median([1, 2, 3, 4]) === 2.5`. Odd-length and length-1 behavior is unchanged.

## Root cause hypothesis (refined)
Confirmed root cause in `src/stats.js`, `median()` (lines 29–35). It computes
`mid = Math.floor(sorted.length / 2)` and unconditionally returns `sorted[mid]`,
with no even-length branch. For even-length arrays it picks a single existing
element instead of averaging the two central elements. The fix (patch stage) is to
add an even-length branch returning `(sorted[mid - 1] + sorted[mid]) / 2`. The
existing suite stayed green because `test/stats.test.js` only covered length-1 and
odd-length cases.
