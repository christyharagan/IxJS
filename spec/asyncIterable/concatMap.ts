import { expect } from 'chai'
import { AsyncIterableClass } from '../../src/index'

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
  it('should only recurse when told to', () => {
    const a = [1, 2, 3]
    const fa = [AsyncIterableClass.from([4, 5]), [AsyncIterableClass.from([6, 7]), 8], [9]]

    function f(i: number, index: number) {
      return fa[index]
    }

    return AsyncIterableClass.from(a).concatMap(f, false).toArray().then(concat => {
      console.log('-------')
      console.log(concat[2])
      expect(concat.length).to.equal(5)
      expect(concat[0]).to.equal(4)
      expect(concat[1]).to.equal(5)
      expect(concat[3]).to.equal(8)
      expect(concat[4]).to.equal(9)

      return (<AsyncIterableClass<number>>concat[2]).toArray().then(arr => {
        expect(arr).to.have.members([6, 7])
      })
    })
  })
})