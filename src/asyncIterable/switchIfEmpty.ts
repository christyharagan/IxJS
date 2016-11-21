import { AsyncIteratorClass, AsyncIterator } from '../asyncIterator'
import { AsyncIterableClass, AsyncIterable } from '../asyncIterable'
import { $$asyncIterator } from '../symbol'

export class SwitchIfIterator<T> extends AsyncIteratorClass<T> {
  protected i = 0
  protected it: AsyncIterator<T>

  constructor(it: AsyncIterable<T>, protected switchIterator: AsyncIterator<T>) {
    super()
    this.it = it[$$asyncIterator]()
  }

  protected _next() {
    const self = this
    self.it.next().then(next => {
      if (self.i === -1) {
        self.switchIterator.next().then(next => {
          if (next.done) {
            self.settleReturn(next.value)
          } else {
            self.settleNext(next.value)
          }
        })
      } else if (next.done) {
        if (self.i === 0) {
          self.i = -1
          self._next()
        } else {
          self.settleReturn(next.value)
        }
      } else {
        self.i++
        self.settleNext(next.value)
      }
    })
  }
}

export class SwitchIfIterable<T> extends AsyncIterableClass<T> {
  constructor(source: AsyncIterable<T>, switchIterable: { [Symbol.iterator](): Iterator<T> } | AsyncIterable<T>) {
    super(new SwitchIfIterator(source, AsyncIterableClass.from(switchIterable)[$$asyncIterator]()))
  }
}

export function switchIfEmpty<T>(switchIterable: { [Symbol.iterator](): Iterator<T> } | AsyncIterable<T>) {
  return new SwitchIfIterable(this, switchIterable)
}