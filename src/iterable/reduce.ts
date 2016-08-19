import { IterableClass } from '../iterable'

export function reduce<T, R>(accumulator: (acc: R | undefined, value: T) => R): R
export function reduce<T, R>(accumulator: (acc: R, value: T) => R, seed: R): R

export function reduce<T, R>(accumulator: (acc: R | undefined, value: T) => R, seed?: R): R {
  const self = <IterableClass<T>>this
  let r = seed

  self.forEach(e => r = accumulator(r, e))

  return <R>r
}