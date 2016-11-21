import { IterableClass } from '../../iterable'
import { switchIfEmpty } from '../../iterable/switchIfEmpty'

IterableClass.prototype.switchIfEmpty = switchIfEmpty

declare module '../../iterable' {
  interface IterableClass<T> {
    switchIfEmpty(switchIterable: { [Symbol.iterator](): Iterator<T> }): IterableClass<T>
  }
}