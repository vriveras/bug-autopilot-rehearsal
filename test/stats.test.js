import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { sum, mean, median } from '../src/stats.js';

describe('sum', () => {
  it('returns 0 for empty array', () => {
    assert.strictEqual(sum([]), 0);
  });

  it('sums positive numbers', () => {
    assert.strictEqual(sum([1, 2, 3, 4]), 10);
  });

  it('handles negative numbers', () => {
    assert.strictEqual(sum([-1, 1, -2, 2]), 0);
  });
});

describe('mean', () => {
  it('computes mean of a single value', () => {
    assert.strictEqual(mean([5]), 5);
  });

  it('computes mean of multiple values', () => {
    assert.strictEqual(mean([2, 4, 6]), 4);
  });

  it('throws on empty array', () => {
    assert.throws(() => mean([]), { message: /at least one value/ });
  });
});

describe('median', () => {
  it('returns the single element for length-1 array', () => {
    assert.strictEqual(median([42]), 42);
  });

  it('returns the middle element for odd-length array', () => {
    assert.strictEqual(median([3, 1, 2]), 2);
  });

  it('handles already-sorted odd-length array', () => {
    assert.strictEqual(median([10, 20, 30, 40, 50]), 30);
  });

  it('throws on empty array', () => {
    assert.throws(() => median([]), { message: /at least one value/ });
  });
});
