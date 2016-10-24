import { AsyncIterableClass } from '../../asyncIterable'
import { range as staticRange } from '../../asyncIterable/range'

AsyncIterableClass.range = staticRange

declare module '../../asyncIterable' {
  namespace AsyncIterableClass {
    export let range: typeof staticRange
  }
}