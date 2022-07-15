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
function createSubscribable<MessageType>(): Subscribable<MessageType> {
  const subscribers: Set<(message: MessageType) => void> = new Set();
  return {
    subscribe(fn: (message: MessageType) => void): () => void {
      subscribers.add(fn);
      return () => {
        subscribers.delete(fn);
      };
    },
    publish(message: MessageType): void {
      subscribers.forEach((fn) => fn(message));
    },
  };
}

export {createSubscribable};
