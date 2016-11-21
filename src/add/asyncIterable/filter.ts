import { AsyncIterableClass } from '../../asyncIterable'
import { filter } from '../../asyncIterable/filter'

AsyncIterableClass.prototype.filter = filter

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    filter(fn: (value: T, index: number) => boolean | Promise<boolean>): AsyncIterableClass<T>
  }
}