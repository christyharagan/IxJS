import {IterableClass} from '../iterable'

export function toArray<T>() {
  const self = <IterableClass<T>>this
  const arr: T[] = []

  self.forEach(e => { arr.push(e) })

  return arr
}