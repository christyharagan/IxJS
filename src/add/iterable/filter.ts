import { IterableClass } from '../../iterable'
import { filter } from '../../iterable/filter'

IterableClass.prototype.filter = filter

declare module '../../iterable' {
  interface IterableClass<T> {
    filter(fn: (value: T, index: number) => boolean): IterableClass<T>
  }
}