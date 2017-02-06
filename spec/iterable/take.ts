import { expect } from 'chai'
import { IterableClass } from '../../src/index'

describe('Iterable.take', () => {
  it('should return an empty sequence if count is less than 0', () => {
    const a = [1]

    const taken = new IterableClass(a).take(-1).toArray()

    expect(taken).to.deep.equal([])
  })

  it('should return an empty sequence if count is 0', () => {
    const a = [1]

    const taken = new IterableClass(a).take(-1).toArray()

    expect(taken).to.deep.equal([])
  })

  it('given positive number, should return an empty sequence if original sequence is empty', () => {
    const a = []

    const taken = new IterableClass(a).take(1).toArray()

    expect(taken).to.deep.equal([])
  })

  it('given negative number, should return an empty sequence if original sequence is empty', () => {
    const a = []

    const taken = new IterableClass(a).take(-1).toArray()

    expect(taken).to.deep.equal([])
  })

  it('should return n elements', () => {
    const a = [1, 2, 3, 4]

    const taken = new IterableClass(a).take(2).toArray()

    expect(taken).to.deep.equal([1, 2])
  })
})