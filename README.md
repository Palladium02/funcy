# Funcy

Monads is a collection of functions and design patterns that
are 100% percent function based.

## Installation

```
npm install https://github.com/Palladium02/funcy.git
```

## Usage

### Option

```ts
import {Some, None, Option} from 'funcy';

function divide(a: number, b: number) {
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
); // will log: The result is 0.666666667

let result = divide(4, 3).map(Math.floor).unwrap();
console.log(result); // will log: 1
```

### Result

```ts
import {Ok, Err} from 'funcy';

function getIndex(values, value) {
  const index = values.indexOf(value);
  switch (index) {
    case -1:
      return Err('Value not found.');
    default:
      return Ok(index);
  }
}

let result = getIndex(['a', 'b', 'c', 'd'], 'z');
console.log(
  result.match({
    ok: (val) => val,
    err: (err) => err,
  }),
);
```

### Command

```ts
import {createCommandStack} from 'funcy';

const add = (state) => [state + 1, (state) => state - 1];

let stack = createCommandStack(0);
stack.execute(add);
console.log(stack.state()); // will log: 1
stack.undo();
console.log(stack.state()); // will log: 0
```

### Observer

```ts
import {createSubscribable} from 'funcy';

let sub = createSubscribable();
let unsub = sub.subscribe((message) => {
  console.log(message);
});

for (let i = 0; i < 10; i++) {
  sub.publish('' + i); // will log: i
}
unsub();

sub.publish('Hey'); // should not log
```
