import { IteratorClass } from '../iterator'
import { IterableClass } from '../iterable'

export class RangeIterator extends IteratorClass<number> {
  protected i: number

  constructor(start: number, protected end: number) {
    super()
    this.i = start
  }

  next(): IteratorResult<number> {
    if (this.i > this.end) {
      return this.settleReturn()
    } else {
      return this.settleNext(this.i++)
    }
  }
}

export class RangeIterable extends IterableClass<number> {
  constructor(start: number, end: number) {
    super(new RangeIterator(start, end))
  }
}

export function range(start: number, end: number) {
  return new RangeIterable(start, end)
}