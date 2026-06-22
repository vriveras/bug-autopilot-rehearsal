# Bug Investigation — collect

## Bug summary
`median()` in `src/stats.js` returns the wrong value for even-length input arrays: it returns the lower-middle element instead of the average of the two middle elements.

## Symptoms
- `node bin/stats.js 1 2 3 4` prints `median: 3` instead of the expected `2.5`.
- Even-length arrays produce a single existing element rather than an averaged value.
- Odd-length arrays return the correct median.
- The existing test suite passes because it only covers odd-length (and length-1) cases.

## Suspected files/functions
| File | Function/Area | Relevance |
|------|---------------|-----------|
| `src/stats.js` | `median()` (lines 29–35) | Root cause — returns `sorted[mid]` with no even-length branch |
| `bin/stats.js` | CLI entry that prints median | Surfaces the bug via the repro command |
| `test/stats.test.js` | `describe('median', …)` | Only tests odd-length cases; missing even-length coverage |

## Hypotheses (ranked by likelihood)
1. **Missing even-length averaging branch in `median()`** — Confirmed by reading `src/stats.js`: it computes `mid = Math.floor(sorted.length / 2)` and unconditionally returns `sorted[mid]`. For even lengths the correct result is `(sorted[mid - 1] + sorted[mid]) / 2`. The inline `// BUG` comment confirms this. (Very high confidence.)
2. **Test gap masking the defect** — `test/stats.test.js` only asserts length-1 and odd-length medians, so the suite stays green despite the bug. Not the root cause, but explains why it went unnoticed and should be addressed with an even-length test. (Supporting.)
3. **CLI parsing/formatting issue in `bin/stats.js`** — Unlikely; the wrong value originates in `median()`, not in the CLI. Listed only for completeness. (Low.)

## Repro context
Run from repo root:
```bash
node bin/stats.js 1 2 3 4
```
Actual: `median: 3` — Expected: `median: 2.5`.
Fix target (reproduce/patch stage): in `median()`, add an even-length branch returning `(sorted[mid - 1] + sorted[mid]) / 2`.

## Related tests
- `test/stats.test.js` — `describe('median')` block tests length-1, odd-length, and empty-array cases; needs an even-length case (e.g. `median([1,2,3,4]) === 2.5`) to lock in the fix.
- `test/stats.test.js` — `sum` and `mean` blocks are unaffected but exercise the same module.
