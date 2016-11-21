///<reference path="./lib.asyncIterator.d.ts"/>

let objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
}
let root: any = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window)

/* tslint:disable:no-internal-module */
declare module NodeJS {
  interface Global {
    window: any;
    global: any;
  }
}
declare let global: NodeJS.Global;
declare let module: any;
declare let exports: any;

/* tslint:disable:no-unused-variable */
let freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
let freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
let freeGlobal = objectTypes[typeof global] && global;

if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
  root = freeGlobal;
}
export let $$iterator: string
export let $$asyncIterator: string

const Symbol: any = root.Symbol

if (typeof Symbol === 'function') {
  if (Symbol.iterator) {
    $$iterator = Symbol.iterator;
  } else if (typeof Symbol.for === 'function') {
    $$iterator = Symbol.for('iterator')
  }
  if (Symbol.asyncIterator) {
    $$asyncIterator = Symbol.asyncIterator
  } else if (typeof Symbol.for === 'function') {
    $$asyncIterator = Symbol.for('asyncIterator')
  }
} else {
  if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
    // Bug for mozilla version
    $$iterator = '@@iterator'
  } else if (root.Map) {
    // es6-shim specific logic
    let keys = Object.getOwnPropertyNames(root.Map.prototype)
    for (let i = 0; i < keys.length; ++i) {
      let key = keys[i]
      if (key !== 'entries' && key !== 'size' && root.Map.prototype[key] === root.Map.prototype['entries']) {
        $$iterator = key
        break;
      }
    }
  } else {
    $$iterator = '@@iterator'
  }
  $$asyncIterator = '@@asyncIterator'
}
