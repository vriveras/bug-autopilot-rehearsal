# Bug Investigation — collect

## Bug summary
`median()` in `src/stats.js` returns the wrong value for even-length input arrays: it returns the lower-middle element instead of the average of the two middle elements.

## Symptoms
- `node bin/stats.js 1 2 3 4` prints `median: 3` but the expected value is `2.5`.
- Only **even-length** arrays are affected; odd-length arrays return correct results.
- The existing test suite passes because it only covers odd-length (and length-1) median cases.

## Suspected files/functions
| File | Function/Area | Relevance |
|------|---------------|-----------|
| `src/stats.js` | `median()` (lines 29–35) | Root cause — `mid = Math.floor(len/2)` then `return sorted[mid]`, no even-length averaging. |
| `bin/stats.js` | CLI entry that prints mean/median | Repro surface; calls `median()` from stats.js. |
| `test/stats.test.js` | `describe('median', …)` | Missing even-length test case; needs coverage to lock the fix. |

## Hypotheses (ranked by likelihood)
1. **Missing even-length averaging in `median()`** — Confirmed by code: line 32 computes `const mid = Math.floor(sorted.length / 2);` and line 34 returns `sorted[mid]`. For even length, `mid` points at the upper-middle index, so the lower-middle average is never computed. The fix is to return `(sorted[mid - 1] + sorted[mid]) / 2` when `sorted.length` is even, and `sorted[mid]` when odd. README and inline comment both corroborate this.
2. **Off-by-one / sort comparator issue** — Unlikely. The comparator `(a, b) => a - b` is correct and odd-length cases pass, so sorting is not the problem.
3. **CLI argument parsing in `bin/stats.js`** — Unlikely. The reported `mean: 2.5` is correct for `[1,2,3,4]`, indicating inputs are parsed as numbers correctly; the defect is isolated to `median()`.

## Repro context
```bash
node bin/stats.js 1 2 3 4
```
Actual: `median: 3`. Expected: `median: 2.5`.
Programmatic repro: `median([1, 2, 3, 4])` returns `3`, should return `2.5`.
Additional cases to verify in reproduce stage: `median([1, 2])` should be `1.5`; odd-length `median([3, 1, 2])` should remain `2`.

## Related tests
- `test/stats.test.js` — `describe('median', …)` block covers length-1, odd-length, already-sorted odd-length, and empty-array throw. **No even-length case** exists; this gap is why the bug shipped. A regression test like `median([1, 2, 3, 4]) === 2.5` should be added in the fix stage.
