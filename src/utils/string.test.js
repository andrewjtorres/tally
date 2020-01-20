'use strict'

const { mprepend, parseDelimitedString, prepend } = require('./string')

describe('mprepend', () => {
  test('should return an empty array', () => {
    expect(mprepend([], 'golf hotel ')).toStrictEqual([])
  })

  test('should return an array of strings with data prepended to each', () => {
    expect(mprepend(['bravo', 'foxtrot'], 'golf hotel ')).toStrictEqual([
      'golf hotel bravo',
      'golf hotel foxtrot',
    ])
  })
})

describe('parseDelimitedString', () => {
  test('should return an array containing substrings of the provided string', () => {
    expect(
      parseDelimitedString('alpha,tango,foxtrot,zulu,oscar', ',')
    ).toStrictEqual(['alpha', 'tango', 'foxtrot', 'zulu', 'oscar'])
  })
})

describe('prepend', () => {
  test('should return a string with data prepended', () => {
    expect(prepend('bravo', 'golf hotel ')).toStrictEqual('golf hotel bravo')
  })
})
