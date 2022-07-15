const {Some, None, Option} = require('../build');

/**
 * Divides two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {Option<number>}
 */
function divide(a, b) {
  if (b === 0) {
    return None;
  }
  return Some(a / b);
}

console.log(
  divide(2, 3).match({
    some: (res) => `The result is ${res}`,
    none: () => 'Cannot divide by zero.',
  }),
);

console.log(
  divide(2, 0).match({
    some: (res) => `The result is ${res}`,
    none: () => 'Cannot divide by zero.',
  }),
);

let x = divide(2, 3).map(Math.floor);
console.log(x.unwrap());
console.log(x.type);
