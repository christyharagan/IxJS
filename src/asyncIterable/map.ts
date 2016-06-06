import {AsyncIteratorClass, AsyncIterator} from '../asyncIterator'
import {AsyncIterableClass, AsyncIterable} from '../asyncIterable'
import {$$asyncIterator} from '../symbol'

export class AsyncMapIterator<T, U> extends AsyncIteratorClass<U> {
  protected it: AsyncIterator<T>
  protected i = 0

  constructor(it: AsyncIterable<T>, protected fn: (value: T, index?: number) => U) {
    super()
    this.it = it[$$asyncIterator]()
  }

  _next() {
    const self = this
    self.it.next().then(next => {
      if (next.done) {
        self.settleReturn(next.value ? self.fn(next.value, self.i++) : undefined)
      } else {
        try {
          const value = self.fn(next.value, self.i++)
          self.settleNext(value)
        } catch (e) {
          self.settleThrow(e)
        }
      }
    }).catch(function (error) {
      self.settleThrow(error)
    })
  }
}

export class AsyncMapIterable<T, U> extends AsyncIterableClass<U> {
  constructor(source: AsyncIterable<T>, fn: (value: T, index?: number) => U) {
    super(new AsyncMapIterator(source, fn))
  }
}

export function map<T, U>(fn: (value: T, index?: number) => U) {
  return new AsyncMapIterable(this, fn)
}