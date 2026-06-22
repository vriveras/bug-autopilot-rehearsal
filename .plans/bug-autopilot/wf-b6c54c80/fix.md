# Bug Fix

## Root cause
`median()` in `src/stats.js` unconditionally returned `sorted[mid]` where
`mid = Math.floor(sorted.length / 2)`. For even-length arrays `mid` is the
upper-middle index, so the function returned the upper-middle element instead of
the average of the two middle elements (`median([1,2,3,4])` returned `3` rather
than `2.5`).

## Fix description
The unconditional `return sorted[mid];` was replaced with a length-parity check:
for even-length input it returns the average of the two middle elements
`(sorted[mid - 1] + sorted[mid]) / 2`, and for odd-length input it returns
`sorted[mid]` as before. This is the minimal correct change and leaves all other
behavior (empty-array throw, sorting, odd-length results) untouched.

## Files modified
| File | Change |
|------|--------|
| `src/stats.js` | `median()` now averages the two middle elements for even-length arrays instead of returning only the upper-middle element. |

## Diff
```diff
diff --git a/src/stats.js b/src/stats.js
index f73fdb2..bad7df5 100644
--- a/src/stats.js
+++ b/src/stats.js
@@ -30,6 +30,5 @@ export function median(nums) {
   if (nums.length === 0) throw new Error('median requires at least one value');
   const sorted = [...nums].sort((a, b) => a - b);
   const mid = Math.floor(sorted.length / 2);
-  // BUG: for even-length arrays this should average sorted[mid-1] and sorted[mid]
-  return sorted[mid];
+  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
 }
```

## Quick validation
- Repro test: PASS (`median even-length bug repro` — 2/2 tests pass; `median([1,2,3,4]) === 2.5`, `median([1,2]) === 1.5`)
- Full suite: PASS (14/14 tests, 4 suites)
- Command: `node --test test/bug-repro.test.js` and `node --test`
- CLI check: `node bin/stats.js 1 2 3 4` → `median: 2.5`

> Note: the root-cause fix was already present in the working tree (committed by the
> prior stage as `2070c40`); this stage confirmed it resolves the bug and that the full
> suite passes. No further source changes were required.
