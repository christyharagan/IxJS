import {expect} from 'chai'
import {IterableClass} from '../../src/index'

describe('Iterable.map', () => {
  it('should equal the same as Array.map', () => {
    const a = [1, 2, 3]

    const concat = new IterableClass(a).map(i => i + 1).toArray()

    expect(concat).to.deep.equal([2, 3, 4])
  })
})