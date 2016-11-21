import { IterableClass } from '../../iterable'
import { concatAll } from '../../iterable/concatAll'

IterableClass.prototype.concatAll = concatAll

declare module '../../iterable' {
  interface IterableClass<T> {
    concatAll<U>(): IterableClass<T>
  }
}