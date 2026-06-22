import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { median } from '../src/stats.js';

describe('median even-length regression', () => {
  it('averages the two middle elements for an even-length array', () => {
    assert.strictEqual(median([1, 2, 3, 4]), 2.5);
  });

  it('returns 1.5 for the length-2 array [1, 2]', () => {
    assert.strictEqual(median([1, 2]), 1.5);
  });

  it('averages the middle pair regardless of input order', () => {
    assert.strictEqual(median([4, 1, 3, 2]), 2.5);
  });

  it('still returns the middle element for an odd-length array', () => {
    assert.strictEqual(median([3, 1, 2]), 2);
  });
});
