import { IterableClass } from '../../iterable'
import { take } from '../../iterable/take'

IterableClass.prototype.take = take

declare module '../../iterable' {
  interface IterableClass<T> {
    take(number: number): IterableClass<T>
  }
}