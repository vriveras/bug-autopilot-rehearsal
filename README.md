# BUG: median() returns wrong value for even-length inputs

## Summary

`median()` in `src/stats.js` returns an incorrect result when the input array has an **even** number of elements. It returns the lower-middle element instead of the average of the two middle elements.

## Reproduction steps

```bash
node bin/stats.js 1 2 3 4
```

### Actual output

```
input:  [1, 2, 3, 4]
mean:   2.5
median: 3
```

### Expected output

```
input:  [1, 2, 3, 4]
mean:   2.5
median: 2.5
```

## Root cause

In `src/stats.js`, the `median` function computes `mid = Math.floor(sorted.length / 2)` and then returns `sorted[mid]`. For even-length arrays, the correct median is `(sorted[mid - 1] + sorted[mid]) / 2`.

## Environment

- Node.js 20+
- No external dependencies
- OS: any

## Notes

- Odd-length arrays work correctly.
- The existing test suite passes because it only tests odd-length cases.
