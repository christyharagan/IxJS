import { expect } from 'chai'
import { AsyncIterableClass } from '../../src/index'

describe('AsyncIterable.join', () => {
  it('should join two iterables', () => {
    const a = [1, 2, 3]
    const b = [4, 5, 6]

    return AsyncIterableClass.from(a).join(b).toArray().then(concat => {
      return expect(concat).to.have.deep.members([[1, 4], [2, 5], [3, 6]])
    })
  })
})