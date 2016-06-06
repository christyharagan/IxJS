import {AsyncIterableClass} from '../../asyncIterable'
import {toArray} from '../../asyncIterable/toArray'

AsyncIterableClass.prototype.toArray = toArray

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    toArray(): Promise<T[]>
  }
}