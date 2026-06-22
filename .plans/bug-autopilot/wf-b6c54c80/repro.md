# Bug Reproduction

## Repro method
test file (node:test — the framework this repo already uses)

## Repro file path
test/bug-repro.test.js

## Command to reproduce
node --test test/bug-repro.test.js

## Observed behavior (failure output)
```
▶ median even-length bug repro
  ✖ averages the two middle elements for even-length arrays (2.0596ms)
  ✖ returns 1.5 for [1, 2] (0.3163ms)
✖ median even-length bug repro (3.8719ms)
ℹ tests 2
ℹ pass 0
ℹ fail 2

✖ failing tests:
test at test\bug-repro.test.js:6:3
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:

  3 !== 2.5

    actual: 3,
    expected: 2.5,
    operator: 'strictEqual',
```

## Expected behavior
For even-length arrays, `median()` should return the average of the two middle
elements:
- `median([1, 2, 3, 4])` should be `2.5` (currently returns `3`)
- `median([1, 2])` should be `1.5` (currently returns `2`)

Odd-length behavior must remain correct: `median([3, 1, 2]) === 2`.

## Root cause hypothesis (refined)
Confirmed. In `src/stats.js`, `median()` computes `const mid = Math.floor(sorted.length / 2)`
and unconditionally `return sorted[mid]`. For even-length arrays `mid` is the upper-middle
index, so the lower-middle element is ignored and no averaging occurs. The fix is to return
`(sorted[mid - 1] + sorted[mid]) / 2` when `sorted.length` is even, and `sorted[mid]` when odd.
