import {AsyncIterableClass, AsyncIterable} from '../../asyncIterable'
import {expand} from '../../asyncIterable/expand'

AsyncIterableClass.prototype.expand = expand

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    expand(project: (value: T, index?: number) => AsyncIterable<T> | Iterable<T> | Promise<AsyncIterable<T> | Iterable<T>>): AsyncIterableClass<T>
  }
}