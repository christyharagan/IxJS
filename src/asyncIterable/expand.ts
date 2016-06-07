import {AsyncIteratorClass, AsyncIterator} from '../asyncIterator'
import {isAsyncIterable, AsyncIterableClass, AsyncIterable} from '../asyncIterable'
import {AsyncFromIterator} from './from'
import {$$asyncIterator} from '../symbol'

export class AsyncExpandIterator<T> extends AsyncIteratorClass<T> {
  protected i = 0
  protected iterators: AsyncIterator<T>[] = []
  protected currentValue: T | undefined

  constructor(it: Iterable<T> | AsyncIterable<T>, protected project: (value: T, index?: number) => AsyncIterable<T> | Iterable<T> | Promise<AsyncIterable<T> | Iterable<T>>) {
    super()
    this.iterators = [isAsyncIterable(it) ? it[$$asyncIterator]() : new AsyncFromIterator(<Iterable<T>>it)]
  }

  protected _next() {
    const self = this

    function processProjection(r: AsyncIterable<T> | Iterable<T>) {
      if (isAsyncIterable(r)) {
        self.iterators.push(r[$$asyncIterator]())
      } else {
        self.iterators.push(new AsyncFromIterator(<Iterable<T>>r))
      }
      recurse()
    }

    function recurse(): void {
      if (self.currentValue) {
        try {
          const r = self.project(self.currentValue, self.i++)
          self.currentValue = undefined
          if (r instanceof Promise) {
            r.then(processProjection)
          } else {
            processProjection(r)
          }
        } catch (e) {
          self.settleThrow(e)
        }
      } else if (self.iterators.length === 0) {
        self.settleReturn()
      } else {
        const iterator = self.iterators[self.iterators.length - 1]
        iterator.next().then(next => {
          if (next.done) {
            self.iterators.pop()
            recurse()
          } else {
            self.currentValue = next.value
            self.settleNext(next.value)
          }
        }).catch(e => {
          self.settleThrow(e)
        })
      }
    }

    recurse()
  }
}

export class AsyncExpandIterable<T> extends AsyncIterableClass<T> {
  constructor(it: AsyncIterable<T>, private project: (value: T, index?: number) => AsyncIterable<T> | Iterable<T>) {
    super(new AsyncExpandIterator(it, project))
  }
}

export function expand<T>(project: (value: T, index?: number) => AsyncIterable<T> | Iterable<T>) {
  return new AsyncExpandIterable(this, project)
}
