import { expect } from 'chai'
import { AsyncIterableClass } from '../../src/index'

describe('AsyncIterable.filter', () => {
  it('should equal the same as Array.filter', () => {
    const a = [1, 2, 3, 4, 5, 6]

    return AsyncIterableClass.from(a).filter(i => i > 3).toArray().then(concat => {
      return expect(concat).to.have.members([4, 5, 6])
    })
  })
  it('should handle Promises', () => {
    const a = [1, 2, 3, 4, 5, 6]

    return AsyncIterableClass.from(a).filter(i => Promise.resolve(i > 3)).toArray().then(concat => {
      return expect(concat).to.have.members([4, 5, 6])
    })
  })
})