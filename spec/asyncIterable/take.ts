import { expect } from 'chai'
import { AsyncIterableClass } from '../../src/index'

describe('AsyncIterable.take', () => {
  it('should return an empty sequence if count is less than 0', () => {
    const a = [1]

    return AsyncIterableClass.from(a).take(-1).toArray().then(result => {
      expect(result).to.deep.equal([])
    })
  })

  it('should return an empty sequence if count is 0', () => {
    const a = [1]

    return AsyncIterableClass.from(a).take(-1).toArray().then(result => {
      expect(result).to.deep.equal([])
    })
  })

  it('given positive number, should return an empty sequence if original sequence is empty', () => {
    const a = []

    return AsyncIterableClass.from(a).take(1).toArray().then(result => {
      expect(result).to.deep.equal([])
    })
  })

  it('given negative number, should return an empty sequence if original sequence is empty', () => {
    const a = []

    return AsyncIterableClass.from(a).take(-1).toArray().then(result => {
      expect(result).to.deep.equal([])
    })
  })

  it('should return n elements', () => {
    const a = [1, 2, 3, 4]

    return AsyncIterableClass.from(a).take(2).toArray().then(result => {
      expect(result).to.deep.equal([1, 2])
    })
  })
})