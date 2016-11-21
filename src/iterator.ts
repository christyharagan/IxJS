import { $$iterator } from './symbol'

export abstract class IteratorClass<T> {
  [$$iterator](): Iterator<T> {
    return this
  };

  abstract next(): IteratorResult<T>

  protected settleNext(value: T): IteratorResult<T> {
    return {
      done: false,
      value: value
    }
  }

  protected settleReturn(value?: T): IteratorResult<T> {
    return {
      done: true,
      value: <T><any>value
    }
  }
}