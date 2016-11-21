import { expect } from 'chai'
import { IterableClass } from '../../src/index'

describe('Iterable.concat', () => {
  it('should equal the same as Array.concat', () => {
    const a = [1, 2, 3]
    const b = [4, 5]
    const c = [6]

    const concat = new IterableClass(a).concat(b, c).toArray()

    expect(concat).to.deep.equal(a.concat(b, c))
  })
})