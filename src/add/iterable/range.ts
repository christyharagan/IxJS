import { IterableClass } from '../../iterable'
import { range as staticRange } from '../../iterable/range'

IterableClass.range = staticRange

declare module '../../iterable' {
  namespace IterableClass {
    export let range: typeof staticRange
  }
}