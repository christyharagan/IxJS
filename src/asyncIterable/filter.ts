import {AsyncIteratorClass, AsyncIterator} from '../asyncIterator'
import {AsyncIterableClass, AsyncIterable} from '../asyncIterable'
import {$$asyncIterator} from '../symbol'

export class AsyncFilterIterator<T> extends AsyncIteratorClass<T> {
  protected it: AsyncIterator<T>
  protected i = 0

  constructor(it: AsyncIterable<T>, protected fn: (value: T, index: number) => boolean) {
    super()
    this.it = it[$$asyncIterator]()
  }

  _next() {
    const self = this
    function recurse() {
      self.it.next().then(next => {
        if (next.done) {
          self.settleReturn(next.value)
        } else if (self.fn(next.value, self.i++)) {
          self.settleNext(next.value)
        } else {
          recurse()
        }
      }).catch(error => {
        self.settleThrow(error)
      })
    }

    recurse()
  }
}

export class AsyncFilterIterable<T> extends AsyncIterableClass<T> {
  constructor(source: AsyncIterable<T>, fn: (value: T, index: number) => boolean) {
    super(new AsyncFilterIterator(source, fn))
  }
}

export function filter<T>(fn: (value: T, index: number) => boolean) {
  return new AsyncFilterIterable(this, fn)
}
