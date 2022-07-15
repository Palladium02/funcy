"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscribable = void 0;
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
function createSubscribable() {
    const subscribers = new Set();
    return {
        subscribe(fn) {
            subscribers.add(fn);
            return () => {
                subscribers.delete(fn);
            };
        },
        publish(message) {
            subscribers.forEach((fn) => fn(message));
        },
    };
}
exports.createSubscribable = createSubscribable;
