import { expect } from 'chai'
import { IterableClass } from '../../src/index'

describe('Iterable.concatAll', () => {
  it('should equal the same as a deeply nested Array.concat', () => {
    const a = [1, [[2], 3]]
    const b = [4, 5]
    const c = [6]

    const concat = new IterableClass([a, b, c]).concatAll().toArray()

    expect(concat).to.deep.equal([1, 2, 3, 4, 5, 6])
  })
})