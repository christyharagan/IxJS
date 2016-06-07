import {expect} from 'chai'
import {AsyncIterableClass} from '../../src/index'

describe('AsyncIterable.concatAll', () => {
  it('should equal the same as a deeply nested Array.concatAll', () => {
    const a = [1, AsyncIterableClass.from([AsyncIterableClass.from([Promise.resolve(2)]), 3])]
    const b = [4, Promise.resolve(5)]
    const c = [6]

    return AsyncIterableClass.from([a, b, c]).concatAll().toArray().then(concat => {
      return expect(concat).to.have.members([1, 2, 3, 4, 5, 6])
    })
  })
})