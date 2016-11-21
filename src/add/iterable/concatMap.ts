import { IterableClass } from '../../iterable'
import { concatMap } from '../../iterable/concatMap'
import { Recursive } from '../../iterable/recursiveType'

IterableClass.prototype.concatMap = concatMap

declare module '../../iterable' {
  interface IterableClass<T> {
    concatMap<R>(fn: (value: T, index?: number) => Recursive<R>, recursive?: boolean): IterableClass<R>
    concatMap<I, R>(fn: (value: T, index?: number) => Recursive<I>, resFn: (outerValue: T, innerValue: I) => R, recursive?: boolean): IterableClass<R>
  }
}