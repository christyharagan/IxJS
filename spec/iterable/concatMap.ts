import { expect } from 'chai'
import { IterableClass } from '../../src/index'

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
  it('should only recurse when told to', () => {
    const a = [1, 2, 3]
    const fa = [[4, 5], [[6, 7], 8], [9]]

    function f(i: number, index: number) {
      return fa[index]
    }

    const concat = new IterableClass(a).concatMap(f, false).toArray()

    expect(concat.length).to.equal(5)
    expect(concat[0]).to.equal(4)
    expect(concat[1]).to.equal(5)
    expect(concat[3]).to.equal(8)
    expect(concat[4]).to.equal(9)
    expect(concat[2]).to.have.members([6, 7])
  })
})