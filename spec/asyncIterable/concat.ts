import { expect } from 'chai'
import { AsyncIterableClass } from '../../src/index'

describe('AsyncIterable.concat', () => {
  it('should equal the same as Array.concat', () => {
    const a = AsyncIterableClass.from([1, 2, 3])
    const b = [4, 5]
    const c = AsyncIterableClass.from([6])

    return a.concat(b, c).toArray().then(concat => {
      return expect(concat).to.have.members([1, 2, 3, 4, 5, 6])
    })
  })
})