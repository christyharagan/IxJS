import { AsyncIteratorClass, AsyncIterator } from '../asyncIterator'
import { AsyncIterableClass, AsyncIterable, isAsyncIterable } from '../asyncIterable'
import { isIterable } from '../iterable'
import { $$iterator, $$asyncIterator } from '../symbol'

export type Collection<T> =
  Iterator<T | Promise<T>> |
  { [Symbol.iterator](): Iterator<T | Promise<T>> } |
  AsyncIterable<T | Promise<T>> |
  Promise<Iterator<T | Promise<T>> | { [Symbol.iterator](): Iterator<T | Promise<T>> } | AsyncIterable<T | Promise<T>>>

export class AsyncFromIterator<T> extends AsyncIteratorClass<T> {
  protected isAsync: Promise<boolean>
  protected it: Iterator<T | Promise<T>>
  protected ait: AsyncIterator<T | Promise<T>>

  constructor(collection: Collection<T>) {
    super()
    if (collection instanceof Promise) {
      const self = this
      this.isAsync = collection.then(collection => {
        if (isIterable(collection)) {
          self.it = collection[$$iterator]()
          return false
        } else if (isAsyncIterable(collection)) {
          self.ait = collection[$$asyncIterator]()
          return true
        } else {
          self.it = collection
          return false
        }
      })
    } else {
      if (isIterable(collection)) {
        this.it = collection[$$iterator]()
      } else if (isAsyncIterable(collection)) {
        this.ait = collection[$$asyncIterator]()
      } else {
        this.it = collection
      }
      this.isAsync = Promise.resolve(false)
    }
  }

  protected _next() {
    const self = this
    function doNext(next: IteratorResult<T | Promise<T>>) {
      if (next.done) {
        self.settleReturn()
      } else {
        const value = next.value
        if (value instanceof Promise) {
          value.then(value => self.settleNext(value))
        } else {
          self.settleNext(value)
        }
      }
    }
    self.isAsync.then(isAsync => {
      if (isAsync) {
        self.ait.next().then(doNext)
      } else {
        doNext(self.it.next())
      }
    })
  }
}

export class AsyncFromIterable<T> extends AsyncIterableClass<T> {
  constructor(syncSource: Collection<T>) {
    super(new AsyncFromIterator<T>(syncSource))
  }
}

export function from<T>(syncSource: Collection<T>) {
  return new AsyncFromIterable<T>(syncSource)
}