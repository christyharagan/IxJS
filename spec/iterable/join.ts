import {expect} from 'chai'
import {IterableClass} from '../../src/index'

describe('Iterable.join', () => {
  it('should join two iterables', () => {
    const a = [1, 2, 3]
    const b = [4, 5, 6]

    const concat = new IterableClass(a).join(b).toArray()

    expect(concat).to.deep.equal([[1, 4], [2, 5], [3, 6]])
  })
})