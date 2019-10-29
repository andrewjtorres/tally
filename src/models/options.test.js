'use strict'

jest.mock('fs')

const fs = require('fs')

const Options = require('./options')

describe('Options', () => {
  describe('get', () => {
    test('should return null', () =>
      new Promise(resolve => {
        const filename = './file.txt'
        const options = new Options({ filename })

        fs.setMockFiles({ [filename]: 'alpha\ntango\nfoxtrot\nzulu\noscar\n' })

        options.parse([], () => {
          expect(options.get('a')).toBeNull()

          fs.resetMockFiles()

          resolve()
        })
      }))

    test('should return an object containing the key-value pair', () =>
      new Promise(resolve => {
        const filename = './file.txt'
        const key = 'tags'
        const options = new Options({ filename })

        fs.setMockFiles({ [filename]: 'alpha\ntango\nfoxtrot\nzulu\noscar\n' })

        options.parse([], () => {
          expect(options.get(key)).toStrictEqual({
            [key]: ['alpha', 'tango', 'foxtrot', 'zulu', 'oscar'],
          })

          fs.resetMockFiles()

          resolve()
        })
      }))
  })

  describe('parse', () => {
    test('should parse the default tags file', () =>
      new Promise(resolve => {
        const filename = './file.txt'
        const key = 'tags'
        const options = new Options({ filename })

        fs.setMockFiles({ [filename]: 'alpha\ntango\nfoxtrot\nzulu\noscar\n' })

        options.parse([], () => {
          expect(options.get(key)).toStrictEqual({
            [key]: ['alpha', 'tango', 'foxtrot', 'zulu', 'oscar'],
          })

          fs.resetMockFiles()

          resolve()
        })
      }))

    test('should parse the last value in the arguments array', () =>
      new Promise(resolve => {
        const key = 'tags'
        const options = new Options({ filename: './file.txt' })

        options.parse(['', '', 'whiskey', 'charlie,india,bravo'], () => {
          expect(options.get(key)).toStrictEqual({
            [key]: ['charlie', 'india', 'bravo'],
          })

          resolve()
        })
      }))
  })
})
