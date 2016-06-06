import {AsyncIteratorClass, AsyncIterator} from '../asyncIterator'
import {AsyncIterable, isAsyncIterable, AsyncIterableClass} from '../asyncIterable'
import {$$asyncIterator} from '../symbol'
import {isIterable} from '../iterable'
import {RecursiveOrElement, Recursive} from './recursiveType'
import {AsyncFromIterator} from './from'

export class AsyncConcatMapIterator<T, I, R> extends AsyncIteratorClass<R> {
  protected i = 0
  protected iterators: AsyncIterator<RecursiveOrElement<I>>[] = []
  protected outerValue: T | undefined
  protected it: AsyncIterator<T>

  constructor(it: AsyncIterable<T>, fn: (value: T, index?: number) => Recursive<R>)
  constructor(it: AsyncIterable<T>, fn: (value: T, index?: number) => Recursive<I>, resFn: (outerValue: T, innerValue: I) => R)

  constructor(it: AsyncIterable<T>, protected fn: (value: T, index?: number) => Recursive<I>, protected resFn?: (outerValue: T, innerValue: I) => R) {
    super()
    this.it = it[$$asyncIterator]()
  }

  _next() {
    const self = this
    function recurse() {
      if (self.iterators.length === 0) {
        self.it.next().then(next => {
          if (next.done) {
            self.settleReturn()
          } else {
            const it = self.fn(next.value, self.i++)
            if (isAsyncIterable(it)) {
              self.iterators.push(it[$$asyncIterator]())
            } else {
              self.iterators.push(new AsyncFromIterator(<Iterable<I>>it))
            }
            recurse()
          }
        })
      } else {
        const lastR = self.iterators[self.iterators.length - 1]
        lastR.next().then(next => {
          if (next.done) {
            self.iterators.pop()
            recurse()
          } else {
            const _value = next.value
            if (isAsyncIterable(_value)) {
              self.iterators.push(_value[$$asyncIterator]())
              recurse()
            } else if (isIterable(_value)) {
              self.iterators.push(new AsyncFromIterator(<Iterable<I>>_value))
              recurse()
            } else {
              try {
                const value = self.resFn ? self.resFn(<T>self.outerValue, <I>_value) : <R><any>_value
                self.settleNext(value)
              } catch (e) {
                self.settleThrow(e)
              }
            }
          }
        })
      }
    }
    recurse()
  }
}

export class AsyncConcatMapIterable<T, I, R> extends AsyncIterableClass<R> {
  constructor(source: AsyncIterable<T>, fn: (value: T, index?: number) => Recursive<I>, resFn: (outerValue: T, innerValue: I) => R)
  constructor(source: AsyncIterable<T>, fn: (value: T, index?: number) => Recursive<R>)

  constructor(source: AsyncIterable<T>, fn: (value: T, index?: number) => Recursive<I>, resFn?: (outerValue: T, innerValue: I) => R) {
    super(new AsyncConcatMapIterator(source, fn, <(outerValue: T, innerValue: I) => R>resFn))
  }
}

export function concatMap<T, R>(fn: (value: T, index?: number) => Recursive<R>): AsyncConcatMapIterable<T, R, R>
export function concatMap<T, I, R>(fn: (value: T, index?: number) => Recursive<I>, resFn: (outerValue: T, innerValue: I) => R): AsyncConcatMapIterable<T, I, R>

export function concatMap<T, I, R>(fn: (value: T, index?: number) => Recursive<I>, resFn?: (outerValue: T, innerValue: I) => R) {
  return new AsyncConcatMapIterable<T, I, R>(this, fn, <(outerValue: T, innerValue: I) => R>resFn)
}
