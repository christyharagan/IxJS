import { $$iterator } from './symbol'

export class IterableClass<T> {
  constructor(protected source: { [Symbol.iterator](): Iterator<T> } | Iterator<T>) { }

  [$$iterator](): Iterator<T> {
    const source = this.source
    return isIterable(source) ? source[$$iterator]() : source
  }

  forEach(fn: (element: T, index?: number) => void) {
    let i = 0, it = this[$$iterator](), next: IteratorResult<T>
    while (!(next = it.next()).done) {
      fn(next.value, i++)
    }
  }
}

export function isIterable(x: any): x is { [Symbol.iterator](): Iterator<any> } {
  return x != null && Object(x) === x && typeof x[$$iterator] !== 'undefined'
}