import { expect } from 'chai'
import { IterableClass } from '../../src/index'

describe('Iterable.filter', () => {
  it('should equal the same as Array.filter', () => {
    const a = [1, 2, 3, 4, 5, 6]

    const concat = new IterableClass(a).filter(i => i > 3).toArray()

    expect(concat).to.deep.equal([4, 5, 6])
  })
})