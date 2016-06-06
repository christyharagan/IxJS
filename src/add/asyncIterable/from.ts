import {AsyncIterableClass} from '../../asyncIterable'
import {from as staticFrom} from '../../asyncIterable/from'

AsyncIterableClass.from = staticFrom

declare module '../../asyncIterable' {
  namespace AsyncIterableClass {
    export let from: typeof staticFrom
  }
}