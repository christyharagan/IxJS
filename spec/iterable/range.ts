import { expect } from 'chai'
import { IterableClass } from '../../src/index'

describe('Iterable.range', () => {
  it('should iterate between start and end', () => {
    const arr = IterableClass.range(3, 7).toArray()
    expect(arr[0]).to.equal(3)
    expect(arr[1]).to.equal(4)
    expect(arr[2]).to.equal(5)
    expect(arr[3]).to.equal(6)
    expect(arr[4]).to.equal(7)
  })
  it ('should return an empty iterable when start is greater than end', () => {
    const arr = IterableClass.range(7, 3).toArray()
    expect(arr.length).to.be.empty
  })
})