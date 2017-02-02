import { IterableClass } from '../../iterable'
import { first } from '../../iterable/first'

IterableClass.prototype.first = first

declare module '../../iterable' {
  interface IterableClass<T> {
    first(): T | undefined
  }
}