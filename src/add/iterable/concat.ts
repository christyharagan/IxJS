import {IterableClass} from '../../iterable'
import {concat} from '../../iterable/concat'

IterableClass.prototype.concat = concat

declare module '../../iterable' {
  interface IterableClass<T> {
    concat<S>(...iterables: Iterable<T>[]): IterableClass<T>
  }
}