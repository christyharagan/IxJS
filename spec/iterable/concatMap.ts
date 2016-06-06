import {expect} from 'chai'
import {IterableClass} from '../../src/index'

describe('Iterable.concatMap', () => {
  it('should equal the same as a deeply nested Array.map -> Array.concat', () => {
    const a = [1, 2, 3]
    const fa = [[4, 5], [[6, 7], 8], [9]]

    function f(i: number, index: number) {
      return fa[index]
    }

    const concat = new IterableClass(a).concatMap(f).toArray()

    expect(concat).to.deep.equal([4, 5, 6, 7, 8, 9])
  })
})