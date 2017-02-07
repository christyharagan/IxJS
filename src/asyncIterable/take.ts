import {AsyncIteratorClass, AsyncIterator} from '../asyncIterator'
import {AsyncIterableClass, AsyncIterable} from '../asyncIterable'
import {$$asyncIterator} from '../symbol'

export class AsyncTakeIterator<T> extends AsyncIteratorClass<T> {
  protected it: AsyncIterator<T>
  protected i: number

  constructor(it: AsyncIterable<T>, protected number: number) {
    super()
    this.it = it[$$asyncIterator]()
    this.i = number
  }

  protected _next() {
    if (this.i <= 0) {
      this.settleReturn(undefined)
    } else {
      this.it.next()
        .then(next => {
          if (next.done) {
            this.settleReturn(next.value)
          } else {
            this.i = this.i - 1
            return this.settleNext(next.value)
          }
        })
        .catch(error => { this.settleThrow(error) })
    }
  }
}

export class AsyncTakeIterable<T> extends AsyncIterableClass<T> {
  constructor(source: AsyncIterable<T>, number: number) {
    super(new AsyncTakeIterator(source, number))
  }
}

export function take<T>(number: number) {
  return new AsyncTakeIterable(this, number)
}
