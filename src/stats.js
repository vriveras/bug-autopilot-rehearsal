/**
 * Basic statistics utilities.
 */

/**
 * Returns the sum of an array of numbers.
 * @param {number[]} nums
 * @returns {number}
 */
export function sum(nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}

/**
 * Returns the arithmetic mean of an array of numbers.
 * @param {number[]} nums
 * @returns {number}
 */
export function mean(nums) {
  if (nums.length === 0) throw new Error('mean requires at least one value');
  return sum(nums) / nums.length;
}

/**
 * Returns the median of an array of numbers.
 * @param {number[]} nums
 * @returns {number}
 */
export function median(nums) {
  if (nums.length === 0) throw new Error('median requires at least one value');
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  // BUG: for even-length arrays this should average sorted[mid-1] and sorted[mid]
  return sorted[mid];
}
