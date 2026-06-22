# Bug Fix

## Root cause
`median()` in `src/stats.js` computed `mid = Math.floor(sorted.length / 2)` and
unconditionally returned `sorted[mid]`. For even-length arrays `mid` points at the
upper of the two middle elements, so the function returned that single value instead
of the average of the two middle elements (e.g. `3` instead of `2.5` for `[1,2,3,4]`).

## Fix description
Added an even-length branch in `median()` that returns the average of the two middle
elements, `(sorted[mid - 1] + sorted[mid]) / 2`, while leaving the odd-length path
(`return sorted[mid]`) unchanged. This replaces the `BUG:` placeholder comment with the
correct averaging logic. Minimal change, no refactoring of unrelated code.

## Files modified
| File | Change |
|------|--------|
| `src/stats.js` | Added even-length branch in `median()` to average the two middle elements. |

## Diff
```diff
diff --git a/src/stats.js b/src/stats.js
index f73fdb2..922ea68 100644
--- a/src/stats.js
+++ b/src/stats.js
@@ -30,6 +30,8 @@ export function median(nums) {
   if (nums.length === 0) throw new Error('median requires at least one value');
   const sorted = [...nums].sort((a, b) => a - b);
   const mid = Math.floor(sorted.length / 2);
-  // BUG: for even-length arrays this should average sorted[mid-1] and sorted[mid]
+  if (sorted.length % 2 === 0) {
+    return (sorted[mid - 1] + sorted[mid]) / 2;
+  }
   return sorted[mid];
 }
```

## Quick validation
- Repro test: PASS
- Command: `node --test test\bug-repro.test.js` (3/3 pass) and full suite `node --test` (15/15 pass)
