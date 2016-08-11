import { IteratorClass } from '../iterator'
import { IterableClass, isIterable } from '../iterable'
import { RecursiveOrElement } from './recursiveType'
import { $$iterator } from '../symbol'

export class ConcatAllIterator<T> extends IteratorClass<T> {
  protected i = 0
  protected iterators: Iterator<RecursiveOrElement<T>>[]

  constructor(it: { [Symbol.iterator](): Iterator<RecursiveOrElement<T>> }) {
    super()
    this.iterators = [it[$$iterator]()]
  }

  next() {
    const self = this

    function recurse(): IteratorResult<T> {
      if (self.iterators.length === 0) {
        return self.settleReturn()
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
            return self.settleNext(<T>_value)
          }
        }
      }
    }

    return recurse()
  }
}

export class ConcatAllIterable<T> extends IterableClass<T> {
  constructor(tSource: { [Symbol.iterator](): Iterator<RecursiveOrElement<T>> }) {
    super(new ConcatAllIterator(tSource))
  }
}

export function concatAll<T>() {
  return new ConcatAllIterable(this)
}