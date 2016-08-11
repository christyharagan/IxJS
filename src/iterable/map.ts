import { IteratorClass } from '../iterator'
import { IterableClass } from '../iterable'
import { $$iterator } from '../symbol'

export class MapIterator<T, U> extends IteratorClass<U> {
  protected it: Iterator<T>
  protected i = 0

  constructor(it: { [Symbol.iterator](): Iterator<T> }, protected fn: (value: T, index: number) => U) {
    super()
    this.it = it[$$iterator]()
  }

  next(): IteratorResult<U> {
    const next = this.it.next()
    if (next.done) {
      return this.settleReturn(next.value ? this.fn(next.value, this.i++) : undefined)
    } else {
      const value = this.fn(next.value, this.i++)
      return this.settleNext(value)
    }
  }
}

export class MapIterable<T, U> extends IterableClass<U> {
  constructor(source: { [Symbol.iterator](): Iterator<T> }, fn: (value: T, index: number) => U) {
    super(new MapIterator(source, fn))
  }
}

export function map<T, U>(fn: (value: T, index: number) => U) {
  return new MapIterable(this, fn)
}