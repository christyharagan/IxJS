import { AsyncIterableClass } from '../asyncIterable'
import { AsyncIterator } from '../asyncIterator'
import { $$asyncIterator } from '../symbol'

export function first<T>(): Promise<T | undefined> {
  const self = <AsyncIterableClass<T>>this
  const it = <AsyncIterator<T>>self[$$asyncIterator]()
  return it.next().then(next => {
    if (next.done) {
      return
    } else {
      return next.value
    }
  })
}