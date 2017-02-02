import { expect } from 'chai'
import { IterableClass } from '../../src/index'

describe('Iterable.first', () => {
  it('should return the first element', () => {
    const a = [1, 2, 3]

    const first = new IterableClass(a).first()

    expect(first).to.equal(1)
  })

  it('should return return undefined for an empty sequence', () => {
    const a = []

    const first = new IterableClass(a).first()

    expect(first).to.equal(undefined)
  })
})