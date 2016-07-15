import {IterableClass} from '../../iterable'
import {expand} from '../../iterable/expand'

IterableClass.prototype.expand = expand

declare module '../../iterable' {
  interface IterableClass<T> {
    expand(project: (value: T, index?: number) => Iterable<T>): IterableClass<T>
  }
}
