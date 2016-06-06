import {expect} from 'chai'
import {IterableClass} from '../../src/index'

describe('Iterable.reduce', () => {
  it('should equal the same as Array.reduce', () => {
    const a = [1, 2, 3]

    const concat = new IterableClass(a).reduce((a, i) => a + i, 0)

    expect(concat).to.deep.equal(1 + 2 + 3)
  })
})