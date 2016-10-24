import { AsyncIteratorClass } from '../asyncIterator'
import { AsyncIterableClass } from '../asyncIterable'

export class AsyncRangeIterator extends AsyncIteratorClass<number> {
  protected start: Promise<number>
  protected i: number
  protected end: number

  constructor(start: number | Promise<number>, end: number | Promise<number>) {
    super()

    const self = this
    this.start = Promise.all([start instanceof Promise ? start : Promise.resolve(start), end instanceof Promise ? end : Promise.resolve(end)]).then(([start, end]) => {
      self.i = start
      self.end = end
      return start
    })
  }

  protected _next() {
    const self = this
    this.start.then(start => {
      if (self.i > self.end) {
        self.settleReturn()
      } else {
        self.settleNext(self.i++)
      }
    })
  }
}

export class AsyncRangeIterable extends AsyncIterableClass<number> {
  constructor(start: number | Promise<number>, end: number | Promise<number>) {
    super(new AsyncRangeIterator(start, end))
  }
}

export function range(start: number | Promise<number>, end: number | Promise<number>) {
  return new AsyncRangeIterable(start, end)
}