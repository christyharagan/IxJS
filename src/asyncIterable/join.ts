import {AsyncIteratorClass, AsyncIterator} from '../asyncIterator'
import {AsyncIterableClass, AsyncIterable, isAsyncIterable} from '../asyncIterable'
import {AsyncFromIterator} from './from'
import {$$asyncIterator} from '../symbol'

export class JoinIterator<T, U> extends AsyncIteratorClass<[T, U]> {
  protected a: AsyncIterator<T>
  protected b: AsyncIterator<U>
  protected i = 0

  constructor(a: AsyncIterable<T>, b: Iterable<U> | AsyncIterable<U>) {
    super()
    this.a = a[$$asyncIterator]()
    this.b = isAsyncIterable(b) ? b[$$asyncIterator]() : new AsyncFromIterator(b)
  }

  _next() {
    const self = this
    Promise.all([self.a.next(), self.b.next()]).then(function ([nextA, nextB]) {
      if (nextA.done || nextB.done) {
        self.settleReturn(nextA.value && nextB.value ? [nextA.value, nextB.value] : undefined)
      } else {
        self.settleNext([nextA.value, nextB.value])
      }
    })
  }
}

export class JoinIterable<T, U> extends AsyncIterableClass<[T, U]> {
  constructor(source: AsyncIterable<T>, b: Iterable<U> | AsyncIterable<U>) {
    super(new JoinIterator(source, b))
  }
}

export function join<U>(b: Iterable<U> | AsyncIterable<U>) {
  return new JoinIterable(this, b)
}