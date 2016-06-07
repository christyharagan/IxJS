import {IterableClass} from '../iterable'

export type RecursiveOrElement<T> = T | Recursive<T>
export type Recursive<T> = RecursiveNativeIterable<T> | RecursiveSyntheticIterable<T> | RecursiveIterableClass<T>
export interface RecursiveNativeIterable<T> {
  [Symbol.iterator](): Iterator<RecursiveOrElement<T>>
}
export interface RecursiveSyntheticIterable<T> {
  ['$$iterator'](): Iterator<RecursiveOrElement<T>>
}
export class RecursiveIterableClass<T> extends IterableClass<T> { }
