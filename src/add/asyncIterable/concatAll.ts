import { AsyncIterableClass } from '../../asyncIterable'
import { concatAll } from '../../asyncIterable/concatAll'

AsyncIterableClass.prototype.concatAll = concatAll

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    concatAll(): AsyncIterableClass<T>
  }
}