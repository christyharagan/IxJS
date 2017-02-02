import { expect } from 'chai'
import { AsyncIterableClass } from '../../src/index'

describe('AsyncIterable.first', () => {
  it('should return the first element', () => {
    const a = [1, 2, 3]

    return AsyncIterableClass.from(a).first().then(first => {
      return expect(first).to.equal(1)
    })
  })

  it('should return return undefined for an empty sequence', () => {
    const a = []

    return AsyncIterableClass.from(a).first().then(first => {
      return expect(first).to.equal(undefined)
    })
  })
})