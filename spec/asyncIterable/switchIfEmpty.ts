import { expect } from 'chai'
import { AsyncIterableClass } from '../../src/index'

describe('AsyncIterable.switchIfEmpty', () => {
  it('should switch if empty', () => {
    const s = [1, 2, 3]

    return AsyncIterableClass.from([]).switchIfEmpty(s).toArray().then(concat => {
      return expect(concat).to.deep.equal([1, 2, 3])
    })
  })
  it('should not switch if not empty', () => {
    const a = [4]
    const s = [1, 2, 3]

    return AsyncIterableClass.from(a).switchIfEmpty(s).toArray().then(concat => {
      return expect(concat).to.deep.equal([4])
    })
  })
})