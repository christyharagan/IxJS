import {AsyncIterableClass} from '../../asyncIterable'
import {concat} from '../../asyncIterable/concat'

AsyncIterableClass.prototype.concat = concat

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    concat<S>(...iterables: (Iterable<T> | AsyncIterable<T>)[]): AsyncIterableClass<T>
  }
}