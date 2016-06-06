import {expect} from 'chai'
import {AsyncIterableClass} from '../../src/index'

describe('AsyncIterable.reduce', () => {
  it('should equal the same as Array.reduce', () => {
    const a = [1, 2, 3]

    return AsyncIterableClass.from(a).reduce((a, i) => a + i, 0).then(r => {
      expect(r).to.equal(1 + 2 + 3)
    })
  })
})