# Bug Investigation — collect

## Bug summary
`median()` in `src/stats.js` returns the lower-middle element instead of the average of the two middle elements for even-length input arrays.

## Symptoms
- `node bin/stats.js 1 2 3 4` prints `median: 3` but the correct value is `2.5`.
- Even-length arrays always return `sorted[mid]` (the upper of the two middle elements), never the average.
- Odd-length arrays return the correct value.
- Existing test suite passes because it only covers odd-length (and single-element) cases.

## Suspected files/functions
| File | Function/Area | Relevance |
|------|---------------|-----------|
| `src/stats.js` | `median(nums)` (lines 29–35) | Root cause — computes `mid = Math.floor(length/2)` and returns `sorted[mid]` with no even-length branch. |
| `bin/stats.js` | CLI entry, line 13 `median(args)` | Surfaces the bug in the documented repro output. |
| `test/stats.test.js` | `describe('median')` (lines 33–49) | Test gap — no even-length case, so bug is undetected. |

## Hypotheses (ranked by likelihood)
1. **Missing even-length averaging in `median()`** — Confirmed by code inspection. Line 32 sets `const mid = Math.floor(sorted.length / 2)` and line 34 returns `sorted[mid]`. For even length, `mid` points to the upper middle element; the correct result is `(sorted[mid - 1] + sorted[mid]) / 2`. A `BUG:` comment on line 33 explicitly flags this. This fully explains the `3` vs `2.5` discrepancy.
2. **(Not the cause) Sorting issue** — Ruled out. Line 31 sorts numerically with `(a, b) => a - b`, which is correct; odd-length cases produce correct results, so sorting is fine.
3. **(Not the cause) Input parsing in CLI** — Ruled out. `bin/stats.js` maps args via `Number` correctly and `mean` already reports `2.5`, so input handling is sound.

## Repro context
From README:
```bash
node bin/stats.js 1 2 3 4
```
Actual: `median: 3`. Expected: `median: 2.5`.
Reproduce stage should also check programmatic calls, e.g. `median([1, 2, 3, 4]) === 2.5` and `median([1, 2]) === 1.5`, plus confirm odd-length cases still pass.

## Related tests
- `test/stats.test.js` — `describe('median')` block covers single-element (`[42]`), odd-length (`[3,1,2]`, `[10,20,30,40,50]`), and empty-array throw cases. It lacks any even-length assertion, which is why the bug is currently invisible to the suite. A regression test for an even-length array (e.g. `median([1,2,3,4]) === 2.5`) should be added in the fix stage.
