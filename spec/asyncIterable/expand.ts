import {expect} from 'chai'
import {AsyncIterableClass} from '../../src/index'

describe('AsyncIterable.expand', () => {
  it('should call the project operator recursively', () => {
    const a = [1, 2, 3]
    const b = [[4, 5], [6], AsyncIterableClass.from([7])]

    function f(i: number, index: number) {
      if ((i - 1) >= b.length) {
        return []
      } else {
        return b[i - 1]
      }
    }

    return AsyncIterableClass.from(a).expand(f).toArray().then(concat => {
      return expect(concat).to.have.members([1, 4, 5, 2, 6, 3, 7])
    })
  })
})