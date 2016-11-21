import { IterableClass } from '../../iterable'
import { toArray } from '../../iterable/toArray'

IterableClass.prototype.toArray = toArray

declare module '../../iterable' {
  interface IterableClass<T> {
    toArray(): T[]
  }
}