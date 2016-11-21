import { expect } from 'chai'
import { IterableClass } from '../../src/index'

describe('Iterable.switchIfEmpty', () => {
  it('should switch if empty', () => {
    const s = [1, 2, 3]

    const concat = new IterableClass([]).switchIfEmpty(s).toArray()

    expect(concat).to.deep.equal([1, 2, 3])
  })
  it('should not switch if not empty', () => {
    const a = [4]
    const s = [1, 2, 3]

    const concat = new IterableClass(a).switchIfEmpty(s).toArray()

    expect(concat).to.deep.equal([4])
  })
})