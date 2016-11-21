import { expect } from 'chai'
import { IterableClass } from '../../src/index'

describe('Iterable.expand', () => {
  it('should call the project operator recursively', () => {
    const a = [1, 2, 3]
    const b = [[4, 5], [6], [7]]

    function f(i: number, index: number) {
      if ((i - 1) >= b.length) {
        return []
      } else {
        return b[i - 1]
      }
    }

    const concat = new IterableClass(a).expand(f).toArray()

    expect(concat).to.deep.equal([1, 4, 5, 2, 6, 3, 7])
  })
})