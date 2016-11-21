import { AsyncIterableClass } from '../../asyncIterable'
import { switchIfEmpty } from '../../asyncIterable/switchIfEmpty'

AsyncIterableClass.prototype.switchIfEmpty = switchIfEmpty

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    switchIfEmpty(switchIterable: { [Symbol.iterator](): Iterator<T> } | AsyncIterable<T>): AsyncIterableClass<T>
  }
}