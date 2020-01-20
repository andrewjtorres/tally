'use strict'

const { flattenArrayDeep } = require('./object')

describe('flattenArrayDeep', () => {
  test('should return an empty array', () => {
    expect(flattenArrayDeep('a', {})).toStrictEqual([])
  })

  test('should return an array of values associated with the provided key', () => {
    expect(
      flattenArrayDeep('a', {
        a: ['alpha', 'bravo', 'zulu'],
        b: [
          { c: 'lima', a: ['alpha', 'zulu', 'kilo'] },
          { d: 'hotel', a: null },
        ],
      })
    ).toStrictEqual(['alpha', 'bravo', 'zulu', 'alpha', 'zulu', 'kilo'])
  })
})
