import {expect} from 'chai'
import {AsyncIterableClass} from '../../src/index'

describe('AsyncIterable.concatMap', () => {
  it('should equal the same as a deeply nested Array.map -> Array.concat', () => {
    const a = [1, 2, 3]
    const fa = [AsyncIterableClass.from([4, 5]), [AsyncIterableClass.from([6, 7]), 8], [9]]

    function f(i: number, index: number) {
      return fa[index]
    }

    return AsyncIterableClass.from(a).concatMap(f).toArray().then(concat => {
      return expect(concat).to.have.members([4, 5, 6, 7, 8, 9])
    })
  })
  it('should handle promises', () => {
    const a = [1, 2, 3]
    const fa = [AsyncIterableClass.from([4, 5]), [AsyncIterableClass.from([6, 7]), 8], [9]]

    function f(i: number, index: number) {
      return Promise.resolve(fa[index])
    }

    return AsyncIterableClass.from(a).concatMap(f).toArray().then(concat => {
      return expect(concat).to.have.members([4, 5, 6, 7, 8, 9])
    })
  })
})