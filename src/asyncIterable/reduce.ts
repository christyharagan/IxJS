import { AsyncIterableClass } from '../asyncIterable'

export function reduce<T, R>(accumulator: (acc: R | undefined, value: T, index?: number) => R | Promise<R>): Promise<R>
export function reduce<T, R>(accumulator: (acc: R, value: T, index?: number) => R | Promise<R>, seed: R | Promise<R>): Promise<R>

export function reduce<T, R>(accumulator: (acc: R | undefined, value: T, index?: number) => R | Promise<R>, seed?: R | Promise<R>): Promise<R> {
  const self = <AsyncIterableClass<T>>this
  let r = seed

  return self.forEachAsync((e, i) => {
    r = r instanceof Promise ? r.then(r => accumulator(r, e, i)) : accumulator(r, e, i)
  }).then(() => <R | Promise<R>>r)
}