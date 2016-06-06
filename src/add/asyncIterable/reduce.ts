import {AsyncIterableClass} from '../../asyncIterable'
import {reduce} from '../../asyncIterable/reduce'

AsyncIterableClass.prototype.reduce = reduce

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    reduce<R>(accumulator: (acc: R | undefined, value: T) => R, seed?: R): Promise<R>
  }
}