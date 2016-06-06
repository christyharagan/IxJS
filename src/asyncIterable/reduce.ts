import {AsyncIterableClass} from '../asyncIterable'

export function reduce<T, R>(accumulator: (acc: R | undefined, value: T) => R, seed?: R): Promise<R> {
  const self = <AsyncIterableClass<T>>this
  let r = seed

  return self.forEachAsync(e => r = accumulator(r, e)).then(() => <R>r)
}