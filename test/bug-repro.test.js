import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { median } from '../src/stats.js';

describe('median even-length bug repro', () => {
  it('averages the two middle elements for even-length arrays', () => {
    assert.strictEqual(median([1, 2, 3, 4]), 2.5);
  });

  it('returns 1.5 for [1, 2]', () => {
    assert.strictEqual(median([1, 2]), 1.5);
  });
});
