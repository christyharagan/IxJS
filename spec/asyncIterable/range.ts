import { expect } from 'chai'
import { AsyncIterableClass } from '../../src/index'

describe('AsyncIterable.range', () => {
  it('should iterate between start and end', () => {
    const a = [3, 4, 5, 6, 7]
    return AsyncIterableClass.range(3, 7).toArray().then(arr => {
      return expect(arr).to.have.members(a)
    })
  })
  it('should return an empty iterable when start is greater than end', () => {
    return AsyncIterableClass.range(7, 3).toArray().then(arr => {
      expect(arr.length).to.be.empty
    })
  })
})