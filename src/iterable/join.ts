import {IteratorClass} from '../iterator'
import {IterableClass} from '../iterable'
import {$$iterator} from '../symbol'

export class JoinIterator<T, U> extends IteratorClass<[T, U]> {
  protected a: Iterator<T>
  protected b: Iterator<U>
  protected i = 0

  constructor(a: Iterable<T>, b: Iterable<U>) {
    super()
    this.a = a[$$iterator]()
    this.b = b[$$iterator]()
  }

  next(): IteratorResult<[T, U]> {
    const nextA = this.a.next()
    const nextB = this.b.next()
    if (nextA.done || nextB.done) {
      return this.settleReturn(nextA.value && nextB.value ? [nextA.value, nextB.value] : undefined)
    } else {
      return this.settleNext([nextA.value, nextB.value])
    }
  }
}

export class JoinIterable<T, U> extends IterableClass<[T, U]> {
  constructor(source: Iterable<T>, b: Iterable<U>) {
    super(new JoinIterator(source, b))
  }
}

export function join<T, U>(b: Iterable<U>) {
  return new JoinIterable(this, b)
}