import { IterableClass } from '../../iterable'
import { map } from '../../iterable/map'

IterableClass.prototype.map = map

declare module '../../iterable' {
  interface IterableClass<T> {
    map<U>(fn: (value: T, index?: number) => U): IterableClass<U>
  }
}