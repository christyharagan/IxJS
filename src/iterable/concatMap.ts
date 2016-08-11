import { IteratorClass } from '../iterator'
import { IterableClass, isIterable } from '../iterable'
import { RecursiveOrElement, Recursive } from './recursiveType'
import { $$iterator } from '../symbol'

export class ConcatMapIterator<T, I, R> extends IteratorClass<R> {
  protected i = 0
  protected iterators: Iterator<RecursiveOrElement<I>>[] = []
  protected outerValue: T | undefined
  protected it: Iterator<T>

  constructor(it: { [Symbol.iterator](): Iterator<T> }, fn: (value: T, index?: number) => Recursive<R>)
  constructor(it: { [Symbol.iterator](): Iterator<T> }, fn: (value: T, index?: number) => Recursive<I>, resFn: (outerValue: T, innerValue: I) => R)

  constructor(it: { [Symbol.iterator](): Iterator<T> }, protected fn: (value: T, index?: number) => Recursive<I>, protected resFn?: (outerValue: T, innerValue: I) => R) {
    super()
    this.it = it[$$iterator]()
  }

  next() {
    const self = this
    function recurse(): IteratorResult<R> {
      if (self.iterators.length === 0) {
        const next = self.it.next()

        if (next.done) {
          return self.settleReturn()
        } else {
          self.iterators.push(self.fn(next.value, self.i++)[$$iterator]())
          return recurse()
        }
      } else {
        const lastR = self.iterators[self.iterators.length - 1]
        const next = lastR.next()

        if (next.done) {
          self.iterators.pop()
          return recurse()
        } else {
          const _value = next.value
          if (isIterable(_value)) {
            self.iterators.push(_value[$$iterator]())
            return recurse()
          } else {
            const value = self.resFn ? self.resFn(<T>self.outerValue, <I>_value) : <R><any>_value
            return self.settleNext(value)
          }
        }
      }
    }
    return recurse()
  }
}

export class ConcatMapIterable<T, I, R> extends IterableClass<R> {
  constructor(source: { [Symbol.iterator](): Iterator<T> }, fn: (value: T, index?: number) => Recursive<I>, resFn: (outerValue: T, innerValue: I) => R)
  constructor(source: { [Symbol.iterator](): Iterator<T> }, fn: (value: T, index?: number) => Recursive<R>)

  constructor(source: { [Symbol.iterator](): Iterator<T> }, fn: (value: T, index?: number) => Recursive<I>, resFn?: (outerValue: T, innerValue: I) => R) {
    super(new ConcatMapIterator(source, fn, <(outerValue: T, innerValue: I) => R>resFn))
  }
}

export function concatMap<T, R>(fn: (value: T, index?: number) => Recursive<R>): ConcatMapIterable<T, R, R>
export function concatMap<T, I, R>(fn: (value: T, index?: number) => Recursive<I>, resFn: (outerValue: T, innerValue: I) => R): ConcatMapIterable<T, I, R>

export function concatMap<T, I, R>(fn: (value: T, index?: number) => Recursive<I>, resFn?: (outerValue: T, innerValue: I) => R) {
  return new ConcatMapIterable<T, I, R>(this, fn, <(outerValue: T, innerValue: I) => R>resFn)
}
