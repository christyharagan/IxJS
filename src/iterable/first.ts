import { IteratorClass } from '../iterator'
import { IterableClass } from '../iterable'
import { $$iterator } from '../symbol'

export function first<T>(): T | undefined {
  const self = <IterableClass<T>>this
  const it = <IteratorClass<T>>self[$$iterator]()
  const next = it.next()
  if (next.done) {
    return
  } else {
    return next.value
  }
}
