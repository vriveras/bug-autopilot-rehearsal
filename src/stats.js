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
 * Returns the median of an array of numbers. For odd-length input this is the
 * middle value; for even-length input it is the average of the two central
 * values (and may be fractional).
 * @param {number[]} nums
 * @returns {number} the middle value for odd-length input, or the average of the two central values for even-length input
 */
export function median(nums) {
  if (nums.length === 0) {
    console.warn('median called with an empty array');
    throw new Error('median requires at least one value');
  }
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}
