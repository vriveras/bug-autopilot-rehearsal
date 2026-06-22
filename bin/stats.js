#!/usr/bin/env node
import { mean, median } from '../src/stats.js';

const args = process.argv.slice(2).map(Number);

if (args.length === 0 || args.some(Number.isNaN)) {
  console.error('Usage: node bin/stats.js <num1> <num2> ...');
  process.exit(1);
}

console.log(`input:  [${args.join(', ')}]`);
console.log(`mean:   ${mean(args)}`);
console.log(`median: ${median(args)}`);
