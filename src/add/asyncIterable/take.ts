import { AsyncIterableClass } from '../../asyncIterable'
import { take } from '../../asyncIterable/take'

AsyncIterableClass.prototype.take = take

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    take(number: number): AsyncIterableClass<T>
  }
}