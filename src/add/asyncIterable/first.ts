import { AsyncIterableClass } from '../../asyncIterable'
import { first } from '../../asyncIterable/first'

AsyncIterableClass.prototype.first = first

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    first(): Promise<T | undefined>
  }
}