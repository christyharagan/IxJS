import {AsyncIterableClass} from '../../asyncIterable'
import {join} from '../../asyncIterable/join'

AsyncIterableClass.prototype.join = join

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    join<U>(b: Iterable<U>|AsyncIterable<U>): AsyncIterableClass<[T, U]>
  }
}