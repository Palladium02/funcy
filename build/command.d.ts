declare type CommandFunction<State> = (state: State) => [State, (state: State) => State];
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
declare function createCommandStack<State>(state: State): CommandStack<State>;
export { createCommandStack };
