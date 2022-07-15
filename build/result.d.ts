import { Option } from './option';
export declare const ResultType: {
    Ok: symbol;
    Err: symbol;
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
export declare function Ok<T, E = never>(val: T): ResultOk<T, E>;
export declare function Err<T, E>(err: E): ResultErr<T, E>;
