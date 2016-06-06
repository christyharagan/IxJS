import {AsyncIterableClass} from '../../asyncIterable'
import {concatMap} from '../../asyncIterable/concatMap'
import {Recursive} from '../../asyncIterable/recursiveType'

AsyncIterableClass.prototype.concatMap = concatMap

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    concatMap<R>(fn: (value: T, index?: number) => Recursive<R>): AsyncIterableClass<R>
    concatMap<I, R>(fn: (value: T, index?: number) => Recursive<I>, resFn?: (outerValue: T, innerValue: I) => R): AsyncIterableClass<R>
  }
}