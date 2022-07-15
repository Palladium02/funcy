import {Some, None, Option, OptionNone} from './option';

export const ResultType = {
  Ok: Symbol(':ok'),
  Err: Symbol(':err'),
};

export interface Match<T, E, U> {
  ok: (val: T) => U;
  err: (val: E) => U;
}

export interface Result<T, E> {
  type: symbol;
  isOk(): boolean;
  isErr(): boolean;
  ok(): Option<T>;
  err(): Option<E>;
  unwrap(): T | never;
  unwrapOr(fallback: T): T;
  match<U>(match: Match<T, E, U>): U;
  map<U>(fn: (val: T) => U): Result<U, E>;
}

export interface ResultOk<T, E = never> extends Result<T, E> {
  unwrap(): T;
  unwrapOr(optb: T): T;
  unwrapOrElse(fn: (err: E) => T): T;
  unwrapErr(): never;
  match<U>(fn: Match<T, never, U>): U;
  map<U>(fn: (val: T) => U): ResultOk<U, never>;
}

export interface ResultErr<T, E> extends Result<T, E> {
  unwrap(): never;
  unwrapOr(optb: T): T;
  unwrapOrElse(fn: (err: E) => T): T;
  unwrapErr(): E;
  match<U>(fn: Match<never, E, U>): U;
  map<U>(fn: (val: T) => U): ResultErr<never, E>;
}

export function Ok<T, E = never>(val: T): ResultOk<T, E> {
  return {
    type: ResultType.Ok,
    isOk(): boolean {
      return true;
    },
    isErr(): boolean {
      return false;
    },
    ok(): Option<T> {
      return Some(val);
    },
    err(): OptionNone<E> {
      return None;
    },
    unwrap(): T {
      return val;
    },
    unwrapOr(_optb: T): T {
      return val;
    },
    unwrapOrElse(_fn: (err: E) => T): T {
      return val;
    },
    unwrapErr(): never {
      throw new ReferenceError('Cannot unwrap Err value of Result.Ok');
    },
    match<U>(matchObject: Match<T, never, U>): U {
      return matchObject.ok(val);
    },
    map<U>(fn: (val: T) => U): ResultOk<U, never> {
      return Ok(fn(val));
    },
  };
}

export function Err<T, E>(err: E): ResultErr<T, E> {
  return {
    type: ResultType.Err,
    isOk(): boolean {
      return false;
    },
    isErr(): boolean {
      return true;
    },
    ok(): Option<T> {
      return None;
    },
    err(): Option<E> {
      return Some(err);
    },
    unwrap(): never {
      throw new ReferenceError('Cannot unwrap Ok value of Result.Err');
    },
    unwrapOr(optb: T): T {
      return optb;
    },
    unwrapOrElse(fn: (err: E) => T): T {
      return fn(err);
    },
    unwrapErr(): E {
      return err;
    },
    match<U>(matchObject: Match<never, E, U>): U {
      return matchObject.err(err);
    },
    map<U>(_fn: (_val: T) => U): ResultErr<never, E> {
      return Err(err);
    },
  };
}
