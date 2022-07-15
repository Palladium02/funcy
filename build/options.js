"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.None = exports.Some = exports.OptionType = void 0;
exports.OptionType = {
    Some: Symbol(":some"),
    None: Symbol(":none")
};
function Some(val) {
    return typeof val === "undefined"
        ? none_constructor()
        : some_constructor(val);
}
exports.Some = Some;
exports.None = none_constructor();
function some_constructor(val) {
    return {
        type: exports.OptionType.Some,
        isSome() {
            return true;
        },
        isNone() {
            return false;
        },
        match(match) {
            return match.some(val);
        },
        map(fn) {
            return some_constructor(fn(val));
        },
        or(_option) {
            return this;
        },
        and(option) {
            return option;
        },
        unwrap() {
            return val;
        },
        unwrapOr(_fallback) {
            return val;
        }
    };
}
function none_constructor() {
    return {
        type: exports.OptionType.None,
        isSome() {
            return false;
        },
        isNone() {
            return true;
        },
        match(match) {
            const { none } = match;
            if (typeof none === "function") {
                return none();
            }
            return none;
        },
        map(_fn) {
            return none_constructor();
        },
        or(option) {
            return option;
        },
        and(_option) {
            return none_constructor();
        },
        unwrap() {
            throw new ReferenceError("Cannot unwrap Option of type None.");
        },
        unwrapOr(fallback) {
            if (fallback === null) {
                throw new Error("Cannot unwrapOr with a missing fallback value.");
            }
            return fallback;
        }
    };
}
