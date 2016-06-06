import {IteratorClass} from '../iterator'
import {IterableClass} from '../iterable'
import {$$iterator} from '../symbol'

export class FilterIterator<T> extends IteratorClass<T> {
  protected it: Iterator<T>
  protected i = 0

  constructor(it: Iterable<T>, protected fn: (value: T, index: number) => boolean) {
    super()
    this.it = it[$$iterator]()
  }

  next() {
    let next: IteratorResult<T>
    while (!(next = this.it.next()).done) {
      if (this.fn(next.value, this.i++)) {
        return this.settleNext(next.value)
      }
    }
    return next
  }
}

export class FilterIterable<T> extends IterableClass<T> {
  constructor(source: Iterable<T>, fn: (value: T, index: number) => boolean) {
    super(new FilterIterator(source, fn))
  }
}

export function filter<T>(fn: (value: T, index: number) => boolean) {
  return new FilterIterable(this, fn)
}
