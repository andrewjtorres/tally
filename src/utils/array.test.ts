import { sort } from './array'

describe('sort', () => {
  test('should return a sorted number array in ascending order', () => {
    const array = [5, 2, 0, 8]

    expect(sort((a, b) => a - b, array)).toEqual([0, 2, 5, 8])
    expect(array).toEqual([5, 2, 0, 8])
  })
})
