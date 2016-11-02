import { IterableClass } from '../iterable'

export function reduce<T, R>(accumulator: (acc: R | undefined, value: T, index?: number) => R): R
export function reduce<T, R>(accumulator: (acc: R, value: T, index?: number) => R, seed: R): R

export function reduce<T, R>(accumulator: (acc: R | undefined, value: T, index?: number) => R, seed?: R): R {
  const self = <IterableClass<T>>this
  let r = seed

  self.forEach((e, i) => r = accumulator(r, e, i))

  return <R>r
}