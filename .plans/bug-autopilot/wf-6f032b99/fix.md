# Bug Fix

## Root cause
`median()` in `src/stats.js` computed `mid = Math.floor(sorted.length / 2)` and unconditionally returned `sorted[mid]`. It had no even-length branch, so for even-length arrays it returned the lower-middle element (e.g. `3` for `[1,2,3,4]`) instead of averaging the two central elements.

## Fix description
Added an even-length branch to `median()` that returns `(sorted[mid - 1] + sorted[mid]) / 2` when `sorted.length % 2 === 0`. Odd-length and length-1 behavior is unchanged. Also added even-length test cases (sorted and unsorted) to `test/stats.test.js` to lock in the behavior and close the test gap that hid the defect.

## Files modified
| File | Change |
|------|--------|
| `src/stats.js` | Added even-length averaging branch in `median()` |
| `test/stats.test.js` | Added even-length median tests (sorted + unsorted) |

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
diff --git a/test/stats.test.js b/test/stats.test.js
index 14f5811..d1f0a95 100644
--- a/test/stats.test.js
+++ b/test/stats.test.js
@@ -43,6 +43,14 @@ describe('median', () => {
     assert.strictEqual(median([10, 20, 30, 40, 50]), 30);
   });
 
+  it('averages the two middle elements for even-length array', () => {
+    assert.strictEqual(median([1, 2, 3, 4]), 2.5);
+  });
+
+  it('handles unsorted even-length array', () => {
+    assert.strictEqual(median([4, 1, 3, 2]), 2.5);
+  });
+
   it('throws on empty array', () => {
     assert.throws(() => median([]), { message: /at least one value/ });
   });
```

## Quick validation
- Repro test: PASS
- Command: `node --test test/bug-repro.test.js` (1 pass, 0 fail); full suite `node --test` (13 pass, 0 fail)
