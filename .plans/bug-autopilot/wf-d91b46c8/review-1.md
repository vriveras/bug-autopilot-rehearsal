# Bug-fix review findings — iteration 1

## security review — iteration 1

No findings.

The change is a pure arithmetic fix to `median()` in `src/stats.js` (averaging the two middle elements for even-length arrays) plus added unit tests. There is no untrusted input handling, no I/O, no command/SQL execution, no path construction, no secrets, and no deserialization in scope. Nothing in this diff presents an exploitable security surface.

---

All 13 tests pass. The fix is logically correct — even-length arrays average the two middle elements, odd-length returns the single middle element, empty arrays throw. No off-by-one, edge-case, or error-handling holes in the changed code.

## correctness review — iteration 1

No findings.

---

## performance review — iteration 1

No findings.

The change is a 3-line O(1) branch addition in `median()` (averaging two middle elements) plus a regression test. The existing `[...nums].sort()` cost is O(n log n) and unchanged by this fix. No hot-path, memory, I/O, or blocking concerns are introduced.

---

## maintainability review — iteration 1

### FINDING maintainability-1-1
- **severity**: INFO
- **file**: test/stats.test.js
- **line**: 58-64
- **summary**: Regression test largely duplicates existing median assertions
- **detail**: The new regression case re-asserts `median([1,2,3,4]) === 2.5` (already covered at line 50-51) and `median([3,1,2]) === 2` (already covered at line 38-39). Only `median([1,2]) === 1.5` is genuinely new coverage. This redundancy adds maintenance surface without new behavioral protection.
- **suggested_fix**: Trim the regression `it()` to the unique two-element case (`assert.strictEqual(median([1, 2]), 1.5)`), or fold that single assertion into the existing even-length test at line 50, keeping the explanatory comment.

No further findings — the fix is minimal and well-scoped, uses named exports, ESM `.js` import extensions, and follows the existing `node:test` conventions consistent with the rest of the repo (the role's TS/Vitest hard rules do not apply to this plain-JS codebase). Overall maintainability posture: **5/5**.