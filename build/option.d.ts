export declare const OptionType: {
    Some: symbol;
    None: symbol;
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
export declare function Some<T>(val?: T | undefined): Option<T>;
export declare const None: OptionNone<any>;
