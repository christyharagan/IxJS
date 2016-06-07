import {AsyncIterableClass} from '../asyncIterable'

export function reduce<T, R>(accumulator: (acc: R | undefined, value: T) => R | Promise<R>, seed?: R | Promise<R>): Promise<R> {
  const self = <AsyncIterableClass<T>>this
  let r = seed

  return self.forEachAsync(e => {
    r = r instanceof Promise ? r.then(r => accumulator(r, e)) : accumulator(r, e)
  }).then(() => <R | Promise<R>>r)
}