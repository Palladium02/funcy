const {createCommandStack} = require('../build');

const add = (state) => [state + 1, (state) => state - 1];

let stack = createCommandStack(0);
stack.execute(add);
console.log(stack.state());
stack.undo();
console.log(stack.state());
