import { AsyncIterableClass, AsyncIterable } from '../../asyncIterable'
import { expand } from '../../asyncIterable/expand'

AsyncIterableClass.prototype.expand = expand

declare module '../../asyncIterable' {
  interface AsyncIterableClass<T> {
    expand(project: (value: T, index?: number) => AsyncIterable<T> | { [Symbol.iterator](): Iterator<T> } | Promise<AsyncIterable<T> | { [Symbol.iterator](): Iterator<T> }>): AsyncIterableClass<T>
  }
}