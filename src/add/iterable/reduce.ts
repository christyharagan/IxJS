import {IterableClass} from '../../iterable'
import {reduce} from '../../iterable/reduce'

IterableClass.prototype.reduce = reduce

declare module '../../iterable' {
  interface IterableClass<T> {
    reduce<R>(accumulator: (acc: R, value: T, index?: number) => R, seed: R): R
    reduce<R>(accumulator: (acc: R | undefined, value: T, index?: number) => R): R
  }
}