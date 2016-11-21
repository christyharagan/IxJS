/// <reference path="./lib.asyncIterator.d.ts"/>

import { AsyncIterator } from './asyncIterator'
import { $$asyncIterator } from './symbol'

export type AsyncIterable<T> = {
  [Symbol.asyncIterator](): AsyncIterator<T>
} | { ['@@asyncIterator'](): AsyncIterator<T> } | AsyncIterableClass<T>

export class AsyncIterableClass<T> {
  constructor(protected source: AsyncIterable<T> | AsyncIterator<T>) { }

  [$$asyncIterator](): AsyncIterator<T> {
    return isAsyncIterable(this.source) ? this.source[$$asyncIterator]() : this.source
  }

  forEachAsync(fn: (element: T, index?: number) => void): Promise<void> {
    const self = this
    return new Promise<void>(function (resolve) {
      // A bit of type nastiness to make it work
      const iter: AsyncIterator<T> = isAsyncIterable(self.source) ? self.source[$$asyncIterator]() : self.source
      let i = 0
      function next(): Promise<void> {
        return iter.next().then(function (result) {
          if (result.done) {
            return
          } else {
            fn(result.value, i++)
            return next()
          }
        })
      }
      resolve(next())
    })
  }
}

export function isAsyncIterable(x: any): x is AsyncIterable<any> {
  return x != null && Object(x) === x && typeof x[$$asyncIterator] !== 'undefined'
}
