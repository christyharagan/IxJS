import {AsyncIterableClass} from '../../asyncIterable'
import {map} from '../../asyncIterable/map'

AsyncIterableClass.prototype.map = map

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    map<U>(fn: (value: T, index?: number) => U | Promise<U>): AsyncIterableClass<U>
  }
}