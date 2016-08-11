import { AsyncIterableClass } from '../../asyncIterable'
import { join } from '../../asyncIterable/join'

AsyncIterableClass.prototype.join = join

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    join<U>(b: { [Symbol.iterator](): Iterator<U> } | AsyncIterable<U>): AsyncIterableClass<[T, U]>
  }
}