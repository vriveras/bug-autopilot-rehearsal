# Review Changes Requested — iteration 2

## Comments

- **vriveras** (review comment on `src/stats.js`, 2026-06-22T21:26:07Z):
  > Correction to my note above: line 32 here is the empty-array guard, so that's where this belongs. I've added `console.warn('median called with an empty array');` immediately before the `throw` in the empty-input branch, which is now pushed to this PR (commit `c4abba7`). The existing `throws on empty array` test still passes (13/13). Let me know if you'd prefer a different message or an additional warn elsewhere.

## Requested changes summary

- The reviewer clarified placement of the `console.warn`: it belongs in the **empty-array guard** (around line 32 of `src/stats.js`), immediately before the `throw` in the empty-input branch — not in the even-length averaging branch as previously stated.
- Ensure `median` emits `console.warn('median called with an empty array');` right before throwing on empty input.
- Confirm the existing `throws on empty array` test (and the full suite, 13/13) still passes with the warn in place.
- Reviewer is open to adjusting the warn message or adding an additional warn elsewhere if preferred.
