import {AsyncIteratorClass, AsyncIterator} from '../asyncIterator'
import {AsyncFromIterator} from './from'
import {AsyncIterableClass, isAsyncIterable} from '../asyncIterable'
import {RecursiveOrElement, Recursive} from './recursiveType'
import {isIterable} from '../iterable'
import {$$asyncIterator} from '../symbol'

export class AsyncConcatAllIterator<T> extends AsyncIteratorClass<T> {
  protected i = 0
  protected iterators: AsyncIterator<RecursiveOrElement<T>>[]

  constructor(it: Recursive<T>) {
    super()
    this.iterators = [isAsyncIterable(it) ? it[$$asyncIterator]() : new AsyncFromIterator(<Iterable<T>>it)]
  }

  _next() {
    const self = this

    function recurse() {
      if (self.iterators.length === 0) {
        self.settleReturn()
      } else {
        const lastR = self.iterators[self.iterators.length - 1]
        lastR.next().then(next => {
          if (next.done) {
            self.iterators.pop()
            recurse()
          } else {
            const _value = next.value
            if (isAsyncIterable(_value)) {
              self.iterators.push(_value[$$asyncIterator]())
              recurse()
            } else if (isIterable(_value)) {
              self.iterators.push(new AsyncFromIterator(<Iterable<RecursiveOrElement<T>>>_value))
              recurse()
            } else {
              try {
                self.settleNext(<T>_value)
              } catch (e) {
                self.settleThrow(e)
              }
            }
          }
        }).catch(e => {
          self.settleThrow(e)
        })
      }
    }

    recurse()
  }
}

export class AsyncConcatAllIterable<T> extends AsyncIterableClass<T> {
  constructor(source: Recursive<T>) {
    super(new AsyncConcatAllIterator(source))
  }
}

export function concatAll<T>() {
  return new AsyncConcatAllIterable(this)
}