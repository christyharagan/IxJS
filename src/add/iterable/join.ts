import { IterableClass } from '../../iterable'
import { join } from '../../iterable/join'

IterableClass.prototype.join = join

declare module '../../iterable' {
  interface IterableClass<T> {
    join<U>(b: { [Symbol.iterator](): Iterator<U> }): IterableClass<[T, U]>
  }
}