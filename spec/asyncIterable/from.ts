import { expect } from 'chai'
import { AsyncIterableClass } from '../../src/index'
import { $$iterator } from '../../src/symbol'

describe('AsyncIterable.from', () => {
  it('should handle Iterators', () => {
    const a = [1, 2, 3, 4, 5, 6]
    return AsyncIterableClass.from(a[$$iterator]()).toArray().then(arr => {
      return expect(arr).to.have.members(a)
    })
  })
  it('should handle Iterables', () => {
    const a = [1, 2, 3, 4, 5, 6]
    return AsyncIterableClass.from(a).toArray().then(arr => {
      return expect(arr).to.have.members(a)
    })
  })
  it('should handle Promises of Iterables', () => {
    const a = [1, 2, 3, 4, 5, 6]
    return AsyncIterableClass.from(Promise.resolve(a)).toArray().then(arr => {
      return expect(arr).to.have.members(a)
    })
  })
  it('should handle Promises of Iterators', () => {
    const a = [1, 2, 3, 4, 5, 6]
    return AsyncIterableClass.from(Promise.resolve(a[$$iterator]())).toArray().then(arr => {
      return expect(arr).to.have.members(a)
    })
  })
  it('should handle Promises of AsyncIterables', () => {
    const a = [1, 2, 3, 4, 5, 6]
    return AsyncIterableClass.from(Promise.resolve(AsyncIterableClass.from(a))).toArray().then(arr => {
      return expect(arr).to.have.members(a)
    })
  })
})