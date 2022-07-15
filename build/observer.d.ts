interface Subscribable<MessageType> {
    subscribe(fn: (message: MessageType) => void): () => void;
    publish(message: MessageType): void;
}
/**
 * Function that creates a subscribable.
 * @returns {Subscribable} subscribable object
 *
 * ```ts
 * let sub = createSubscribable<string>();
 * let unsub = sub.subscribe(console.log);
 *
 * sub.publish("Hey"); // will log "Hey"
 * unsub();
 * ```
 */
declare function createSubscribable<MessageType>(): Subscribable<MessageType>;
export { createSubscribable };
