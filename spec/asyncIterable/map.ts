import {expect} from 'chai'
import {AsyncIterableClass} from '../../src/index'

describe('AsyncIterable.map', () => {
  it('should equal the same as Array.map', () => {
    const a = [1, 2, 3]

    return AsyncIterableClass.from(a).map(i => i + 1).toArray().then(concat => {
      return expect(concat).to.have.members([2, 3, 4])
    })
  })
  it('should equal handle Promises', () => {
    const a = [1, 2, 3]

    return AsyncIterableClass.from(a).map(i => Promise.resolve(i + 1)).toArray().then(concat => {
      return expect(concat).to.have.members([2, 3, 4])
    })
  })
})