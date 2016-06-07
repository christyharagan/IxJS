import {AsyncIteratorClass} from '../asyncIterator'
import {AsyncIterableClass} from '../asyncIterable'
import {isIterable} from '../iterable'
import {$$iterator} from '../symbol'

export type Collection<T> = Iterator<T | Promise<T>> | Iterable<T | Promise<T>> | Promise<Iterator<T | Promise<T>> | Iterable<T | Promise<T>>>

export class AsyncFromIterator<T> extends AsyncIteratorClass<T> {
  protected it: Promise<Iterator<T | Promise<T>>>

  constructor(syncSource: Collection<T>) {
    super()
    this.it = syncSource instanceof Promise ? syncSource.then(this.toAsyncIterator) : Promise.resolve(this.toAsyncIterator(syncSource))
  }

  protected toAsyncIterator(syncSource: Iterator<T | Promise<T>> | Iterable<T | Promise<T>>) {
    return isIterable(syncSource) ? syncSource[$$iterator]() : syncSource
  }

  protected _next() {
    const self = this
    self.it.then(it => {
      const next = it.next()
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
    })
  }
}

export class AsyncFromIterable<T> extends AsyncIterableClass<T> {
  constructor(syncSource: Collection<T>) {
    super(new AsyncFromIterator(syncSource))
  }
}

export function from<T>(syncSource: Collection<T>) {
  return new AsyncFromIterable(syncSource)
}