import { IteratorClass } from '../iterator'
import { IterableClass } from '../iterable'
import { $$iterator } from '../symbol'

export class TakeIterator<T> extends IteratorClass<T> {
  protected it: Iterator<T>
  protected i: number

  constructor(it: { [Symbol.iterator](): Iterator<T> }, protected number: number) {
    super()
    this.it = it[$$iterator]()
    this.i = number
  }

  next(): IteratorResult<T> {
    if (this.i <= 0) {
      return this.settleReturn(undefined)
    } else {
      const next = this.it.next()
      if (next.done) {
        return this.settleReturn(next.value)
      } else {
        this.i = this.i - 1
        return this.settleNext(next.value)
      }
    }
  }
}

export class TakeIterable<T> extends IterableClass<T> {
  constructor(source: { [Symbol.iterator](): Iterator<T> }, number: number) {
    super(new TakeIterator(source, number))
  }
}

export function take<T>(number: number) {
  return new TakeIterable(this, number)
}