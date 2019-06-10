'use strict'

const fs = require('fs')

const Options = require('./options')

jest.mock('fs')

describe('Options', () => {
  describe('get', () => {
    test('should return null', done => {
      const filename = './file.txt'
      const options = new Options({ filename })

      fs.setMockFiles({ [filename]: 'alpha\ntango\nfoxtrot\nzulu\noscar\n' })

      options.parse([], () => {
        expect(options.get('a')).toBeNull()

        fs.resetMockFiles()

        done()
      })
    })

    test('should return an object containing the key-value pair', done => {
      const filename = './file.txt'
      const key = 'tags'
      const options = new Options({ filename })

      fs.setMockFiles({ [filename]: 'alpha\ntango\nfoxtrot\nzulu\noscar\n' })

      options.parse([], () => {
        expect(options.get(key)).toStrictEqual({
          [key]: ['alpha', 'tango', 'foxtrot', 'zulu', 'oscar'],
        })

        fs.resetMockFiles()

        done()
      })
    })
  })

  describe('parse', () => {
    test('should parse the default tags file', done => {
      const filename = './file.txt'
      const key = 'tags'
      const options = new Options({ filename })

      fs.setMockFiles({ [filename]: 'alpha\ntango\nfoxtrot\nzulu\noscar\n' })

      options.parse([], () => {
        expect(options.get(key)).toStrictEqual({
          [key]: ['alpha', 'tango', 'foxtrot', 'zulu', 'oscar'],
        })

        fs.resetMockFiles()

        done()
      })
    })

    test('should parse the last value in the arguments array', done => {
      const key = 'tags'
      const options = new Options({ filename: './file.txt' })

      options.parse(['', '', 'whiskey', 'charlie,india,bravo'], () => {
        expect(options.get(key)).toStrictEqual({
          [key]: ['charlie', 'india', 'bravo'],
        })

        done()
      })
    })
  })
})
