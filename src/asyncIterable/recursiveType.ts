import {AsyncIterator} from '../asyncIterator'
import {AsyncIterableClass} from '../asyncIterable'
import {Recursive as SyncRecursive, RecursiveOrElement as SyncRecursiveOrElement} from '../iterable/recursiveType'

export type RecursiveOrElement<T> = SyncRecursiveOrElement<T> | Recursive<T>
export type Recursive<T> = SyncRecursive<T> | RecursiveAsyncSyntheticIterable<T> | RecursiveAsyncIterableClass<T>

export interface RecursiveAsyncNativeIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<RecursiveOrElement<T>>
}
export interface RecursiveAsyncSyntheticIterable<T> {
  ['@@asyncIterator'](): AsyncIterator<RecursiveOrElement<T>>
}
export class RecursiveAsyncIterableClass<T> extends AsyncIterableClass<T> { }