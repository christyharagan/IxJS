import {AsyncIteratorClass} from '../asyncIterator'
import {AsyncIterableClass} from '../asyncIterable'
import {isIterable} from '../iterable'
import {$$iterator} from '../symbol'

export type Collection<T> = Iterator<T> | Iterable<T>

export class AsyncFromIterator<T> extends AsyncIteratorClass<T> {
  protected it: Iterator<T>
  protected i = 0

  constructor(syncSource: Collection<T>, protected fn?: (value: T, index: number) => T) {
    super()
    this.it = isIterable(syncSource) ? syncSource[$$iterator]() : syncSource
  }

  _next() {
    let value: T
    const next = this.it.next();
    if (next.done) {
      this.settleReturn()
    } else {
      value = next.value

      if (this.fn) {
        value = this.fn(value, this.i)
      }
      this.i++
      this.settleNext(value)
    }
  }
}

export class AsyncFromIterable<T> extends AsyncIterableClass<T> {
  constructor(syncSource: Collection<T>, fn?: (value: T, index: number) => T) {
    super(new AsyncFromIterator(syncSource, fn))
  }
}

export function from<T>(syncSource: Collection<T>, fn?: (value: T, index: number) => T) {
  return new AsyncFromIterable(syncSource, fn)
}