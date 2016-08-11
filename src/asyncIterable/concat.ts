import { AsyncIteratorClass, AsyncIterator } from '../asyncIterator'
import { AsyncIterableClass, AsyncIterable, isAsyncIterable } from '../asyncIterable'
import { AsyncFromIterator } from './from'
import { $$asyncIterator, $$iterator } from '../symbol'

export class AsyncConcatIterator<T> extends AsyncIteratorClass<T> {
  protected i = 0
  protected currentIterator: AsyncIterator<T> | undefined

  constructor(protected iterables: Iterator<{ [Symbol.iterator](): Iterator<T> } | AsyncIterable<T>>) {
    super()
  }

  protected _next() {
    const self = this
    const currentIterator = self.currentIterator

    if (currentIterator) {
      currentIterator.next().then(next => {
        if (next.done) {
          self.currentIterator = undefined
          self._next()
        } else {
          self.settleNext(next.value)
        }
      }).catch(e => {
        self.settleThrow(e)
      })
    } else {
      const nextIt = self.iterables.next()
      if (nextIt.done) {
        self.settleReturn()
      } else {
        const nextIterable = nextIt.value
        if (isAsyncIterable(nextIterable)) {
          self.currentIterator = nextIterable[$$asyncIterator]()
        } else {
          self.currentIterator = new AsyncFromIterator(<{ [Symbol.iterator](): Iterator<T> }>nextIterable)
        }
        self._next()
      }
    }
  }
}

export class AsyncConcatIterable<T> extends AsyncIterableClass<T> {
  constructor(source: AsyncIterable<T>, iterables: ({ [Symbol.iterator](): Iterator<T> } | AsyncIterable<T>)[]) {
    const allIterables = [<{ [Symbol.iterator](): Iterator<T> } | AsyncIterable<T>>source].concat(iterables)
    super(new AsyncConcatIterator(allIterables[$$iterator]()))
  }
}

export function concat<T>(...iterables: ({ [Symbol.iterator](): Iterator<T> } | AsyncIterable<T>)[]) {
  return new AsyncConcatIterable(this, iterables)
}