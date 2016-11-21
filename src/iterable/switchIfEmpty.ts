import { IteratorClass } from '../iterator'
import { IterableClass } from '../iterable'
import { $$iterator } from '../symbol'

export class SwitchIfIterator<T> extends IteratorClass<T> {
  protected it: Iterator<T>
  protected i = 0

  constructor(it: { [Symbol.iterator](): Iterator<T> }, protected switchIterator: Iterator<T>) {
    super()
    this.it = it[$$iterator]()
  }

  next(): IteratorResult<T> {
    if (this.i === -1) {
      const next = this.switchIterator.next()
      if (next.done) {
        return this.settleReturn(next.value)
      } else {
        return this.settleNext(next.value)
      }
    } else {
      const next = this.it.next()
      if (next.done) {
        if (this.i === 0) {
          this.i = -1
          return this.next()
        } else {
          return this.settleReturn(next.value)
        }
      } else {
        this.i++
        return this.settleNext(next.value)
      }
    }
  }
}

export class SwitchIfIterable<T> extends IterableClass<T> {
  constructor(source: { [Symbol.iterator](): Iterator<T> }, switchIterable: { [Symbol.iterator](): Iterator<T> }) {
    super(new SwitchIfIterator(source, switchIterable[Symbol.iterator]()))
  }
}

export function switchIfEmpty<T>(switchIterable: { [Symbol.iterator](): Iterator<T> }) {
  return new SwitchIfIterable(this, switchIterable)
}