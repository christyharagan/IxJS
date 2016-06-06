import {AsyncIterableClass} from '../asyncIterable'

export function toArray<T>(): Promise<T[]> {
  const self = <AsyncIterableClass<T>>this
  const arr: T[] = []

  return self.forEachAsync(e => {arr.push(e)}).then(() => arr)
}