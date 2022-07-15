export const OptionType = {
  Some: Symbol(':some'),
  None: Symbol(':none'),
};

export interface Match<T, U> {
  some: (val: T) => U;
  none: (() => U) | U;
}

export interface Option<T> {
  type: symbol;
  isSome(): boolean;
  isNone(): boolean;
  match<U>(fn: Match<T, U>): U;
  map<U>(fn: (val: T) => U): Option<U>;
  or<U>(option: Option<U>): Option<T | U>;
  and<U>(option: Option<U>): Option<U>;
  unwrap(): T | never;
  unwrapOr(fallback: T): T;
}

export interface OptionSome<T> extends Option<T> {
  unwrap(): T;
  map<U>(fn: (val: T) => U): OptionSome<U>;
  or<U>(option: Option<U>): Option<T>;
  and<U>(option: Option<U>): Option<U>;
}

export interface OptionNone<T> extends Option<T> {
  unwrap(): never;
  map<U>(fn: (val: T) => U): OptionNone<U>;
  or<U>(option: Option<U>): Option<U>;
  and<U>(option: Option<U>): Option<U>;
}

export function Some<T>(val?: T | undefined): Option<T> {
  return typeof val === 'undefined'
    ? none_constructor<T>()
    : some_constructor<T>(val as T);
}

export const None = none_constructor<any>();

function some_constructor<T>(val: T): OptionSome<T> {
  return {
    type: OptionType.Some,
    isSome() {
      return true;
    },
    isNone() {
      return false;
    },
    match<U>(match: Match<T, U>): U {
      return match.some(val);
    },
    map<U>(fn: (val: T) => U): OptionSome<U> {
      return some_constructor<U>(fn(val));
    },
    or<U>(_option: Option<U>) {
      return this;
    },
    and<U>(option: Option<U>) {
      return option;
    },
    unwrap() {
      return val;
    },
    unwrapOr(_fallback: T) {
      return val;
    },
  };
}

function none_constructor<T>(): OptionNone<T> {
  return {
    type: OptionType.None,
    isSome() {
      return false;
    },
    isNone() {
      return true;
    },
    match<U>(match: Match<T, U>): U {
      const {none} = match;
      if (typeof none === 'function') {
        return (none as () => U)();
      }
      return none;
    },
    map<U>(_fn: (val: T) => U): OptionNone<U> {
      return none_constructor<U>();
    },
    or<U>(option: Option<U>) {
      return option;
    },
    and<U>(_option: Option<U>) {
      return none_constructor<U>();
    },
    unwrap() {
      throw new ReferenceError('Cannot unwrap Option of type None.');
    },
    unwrapOr(fallback: T) {
      if (fallback === null) {
        throw new Error('Cannot unwrapOr with a missing fallback value.');
      }
      return fallback;
    },
  };
}
