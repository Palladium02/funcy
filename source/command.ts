type CommandFunction<State> = (
  state: State,
) => [State, (state: State) => State];

interface CommandStack<State> {
  execute(command: CommandFunction<State>): State;
  undo(): State;
  state(): State;
  stack(): ((state: State) => State)[];
}

/**
 * Function that creates a command stack.
 * @param {any} state
 * @returns {CommandStack} command stack
 *
 * ```ts
 * const add: CommandFunction<number> = (state) => [
 *  state + 1,
 *  (state) => state - 1
 * ];
 *
 * let stack = createCommandStack<number>(0);
 * stack.execute(add);
 * console.log(stack.state()); // 1
 * stack.undo();
 * console.log(stack.state()); // 0
 * ```
 */
function createCommandStack<State>(state: State): CommandStack<State> {
  const stack: ((state: State) => State)[] = [];
  let _state = state;
  return {
    execute(command: CommandFunction<State>) {
      const [newState, undoFunction] = command(_state);
      _state = newState;
      stack.push(undoFunction);
      return _state;
    },
    undo() {
      const command = stack.pop();
      if (command) {
        _state = command(_state);
      }
      return _state;
    },
    state() {
      return _state;
    },
    stack() {
      return stack;
    },
  };
}

export {createCommandStack};
