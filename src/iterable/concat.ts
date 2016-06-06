import {IteratorClass} from '../iterator'
import {IterableClass} from '../iterable'
import {$$iterator} from '../symbol'

export class ConcatIterator<T> extends IteratorClass<T> {
  protected i = 0
  protected currentIterator: Iterator<T> | undefined

  constructor(protected iterables: Iterator<Iterable<T>>) {
    super()
  }

  next(): IteratorResult<T> {
    if (this.currentIterator) {
      const next = this.currentIterator.next()
      if (next.done) {
        this.currentIterator = undefined
        return this.next()
      } else {
        return this.settleNext(next.value)
      }
    } else {
      const nextIt = this.iterables.next()
      if (nextIt.done) {
        return this.settleReturn()
      } else {
        this.currentIterator = nextIt.value[$$iterator]()
        return this.next()
      }
    }
  }
}

export class ConcatIterable<T> extends IterableClass<T> {
  constructor(source: Iterable<T>, iterables: Iterable<T>[]) {
    const all: Iterable<T>[] = [source].concat(iterables)
    const allIt: Iterator<Iterable<T>> = all[$$iterator]()
    super(new ConcatIterator(allIt))
  }
}

export function concat<T>(...iterables: Iterable<T>[]) {
  return new ConcatIterable(this, iterables)
}