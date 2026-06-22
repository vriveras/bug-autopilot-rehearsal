# Bug-fix review findings — iteration 1

## security review — iteration 1

No findings.

The change is a pure-arithmetic fix to `median()` in `src/stats.js` (even-length averaging branch) plus numeric test cases in `test/stats.test.js`. No untrusted input, no string interpolation, no file/path operations, no process execution, no credential or secret handling, and no deserialization are introduced. There is no exploitable security surface in this diff.

---

## correctness review — iteration 1

No findings.

The `median()` fix is logically correct across all cases: even-length averages `(sorted[mid-1] + sorted[mid]) / 2` (e.g. `[1,2,3,4]` → `2.5`), odd-length and length-1 return `sorted[mid]` unchanged, and empty input still throws. The defensive copy `[...nums].sort((a,b)=>a-b)` correctly handles unsorted input without mutating the caller's array, and the numeric comparator avoids lexicographic-sort bugs. Regression tests cover sorted and unsorted even-length inputs and the full suite passes (14 pass, 0 fail). No logic, edge-case, error-handling, or resource issues in the changed code.

---

The change is a tiny `median()` fix in a statistics utility — sorting-based O(n log n) median, which is the standard approach. Nothing in my performance lane warrants a finding.

## performance review — iteration 1

No findings.

---

## maintainability review — iteration 1

This is a plain-JavaScript repo (ESM `.js` imports, named exports, `node:test` runner) — I reviewed against the repo's actual conventions, not the TS-specific agents-fleet ones, which don't apply here. The fix is small, correctly placed in `src/stats.js`, and exported/tested through existing surfaces. One maintainability issue:

### FINDING maintainability-1-1
- **severity**: INFO
- **file**: test/stats.test.js
- **line**: 46-67
- **summary**: Regression tests duplicate assertions already added to the `median` describe block
- **detail**: The `median` block (lines 46-52) already asserts `median([1,2,3,4]) === 2.5` and `median([4,1,3,2]) === 2.5`, and the new `median even-length regression` block (lines 59-67) re-asserts the exact same two values with no additional input variety or boundary coverage. This is four tests covering two identical cases, which adds maintenance weight without increasing real coverage.
- **suggested_fix**: Consolidate to a single location — either keep the two cases inside the `median` block (and drop the separate regression block), or move them into the regression block and remove the duplicates at lines 46-52. While consolidating, consider adding a genuinely distinct case (e.g. even-length with negatives like `median([-2,0,2,4]) === 1`) so the second block earns its place.

### FINDING maintainability-1-2
- **severity**: INFO
- **file**: src/stats.js
- **line**: 24-28
- **summary**: JSDoc for `median()` doesn't document even/odd averaging behavior
- **detail**: The fix introduces distinct even-length (average of two central values) vs odd-length (middle value) semantics, but the JSDoc still says only "Returns the median". Documenting the contract helps future callers reason about return types (an even-length median can be fractional).
- **suggested_fix**: Expand the JSDoc, e.g. `@returns {number} the middle value for odd-length input, or the average of the two central values for even-length input`.