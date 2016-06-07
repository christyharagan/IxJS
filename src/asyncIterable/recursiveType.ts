import {AsyncIterator} from '../asyncIterator'
import {AsyncIterableClass} from '../asyncIterable'
import {IterableClass} from '../iterable'

export type RecursiveOrElement<T> = Recursive<T> | Promise<T> | T
export type ImmediateRecursive<T> = RecursiveNativeIterable<T> | RecursiveSyntheticIterable<T> | RecursiveIterableClass<T> | RecursiveAsyncSyntheticIterable<T> | RecursiveAsyncIterableClass<T>

export type Recursive<T> = ImmediateRecursive<T> | Promise<ImmediateRecursive<T>>

export interface RecursiveAsyncNativeIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<RecursiveOrElement<T>>
}
export interface RecursiveAsyncSyntheticIterable<T> {
  ['@@asyncIterator'](): AsyncIterator<RecursiveOrElement<T>>
}
export class RecursiveAsyncIterableClass<T> extends AsyncIterableClass<T> { }

export interface RecursiveNativeIterable<T> {
  [Symbol.iterator](): Iterator<RecursiveOrElement<T>>
}
export interface RecursiveSyntheticIterable<T> {
  ['$$iterator'](): Iterator<RecursiveOrElement<T>>
}
export class RecursiveIterableClass<T> extends IterableClass<T> { }

