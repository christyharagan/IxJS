import {IteratorClass} from '../iterator'
import {IterableClass} from '../iterable'
import {$$iterator} from '../symbol'

export class ExpandIterator<T> extends IteratorClass<T> {
  protected i = 0
  protected iterators: Iterator<T>[] = []
  protected currentValue: T | undefined

  constructor(it: Iterable<T>, protected project: (value: T, index?: number) => Iterable<T>) {
    super()
    this.iterators = [it[$$iterator]()]
  }

  next() {
    const self = this

    function recurse(): IteratorResult<T> {
      if (self.currentValue) {
        const r = self.project(self.currentValue, self.i++)
        self.currentValue = undefined
        self.iterators.push(r[$$iterator]())
        return recurse()
      } else if (self.iterators.length === 0) {
        return self.settleReturn()
      } else {
        const iterator = self.iterators[self.iterators.length - 1]
        const next = iterator.next()
        if (next.done) {
          self.iterators.pop()
          return recurse()
        } else {
          self.currentValue = next.value
          return self.settleNext(next.value)
        }
      }
    }

    return recurse()
  }
}

export class ExpandIterable<T> extends IterableClass<T> {
  constructor(it: Iterable<T>, private project: (value: T, index?: number) => Iterable<T>) {
    super(new ExpandIterator(it, project))
  }
}

export function expand<T>(project: (value: T, index?: number) => Iterable<T>) {
  return new ExpandIterable(this, project)
}
