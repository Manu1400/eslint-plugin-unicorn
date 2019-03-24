/* eslint-disable-next-line no-undef */
const optimizer = require('regexp-tree')
const inefficient = /[\d\d]/;
const inefficient2 = /[0-9 ]/;
const inefficient3 = /[90\d a-za]+/;
const foo = /^by @([a-zA-Z0-9-]+)/

const optimized1 = optimizer.optimize(inefficient); // prefer that
const optimized2 = optimizer.optimize(inefficient, [
  'charClassToMeta',       // [0-9] -> [\d]
  'charClassToSingleChar', // [\d] -> \d
]);

console.log(`${inefficient} -> ${optimized1} === ${optimized2}`);
