'use strict'

jest.mock('fs')
jest.mock('../logger')

const fs = require('fs')

const Cache = require('./cache')
const logger = require('../logger')
const { flattenArrayDeep } = require('../utilities/object')

/**
 * Returns an array of merged values
 *
 * @param {Array}  arr
 * @param {Object} data
 * @returns {Array}
 */
const formatter = (arr, data) => {
  const acc = arr === null ? [] : arr

  return acc.concat(flattenArrayDeep('a', data))
}

describe('Cache', () => {
  describe('get', () => {
    test('should return null', () => {
      const cache = new Cache()

      expect(cache.get('a')).toBeNull()
    })

    test('should return an object containing the key-value pair', () => {
      const cache = new Cache()
      const key = 'a'
      const val = ['sierra']

      cache.set(key, val)

      expect(cache.get(key)).toStrictEqual({ [key]: val })
    })
  })

  describe('load', () => {
    test('should load the files from the data directory', () =>
      new Promise(resolve => {
        fs.setMockFiles({
          './data/1.json':
            '{"a":["foxtrot","golf"],"b":[{"d":"oscar","a":["quebec"]},{"d":"foxtrot","a":null}]}',
          './data/2.json': 'november',
          './data/3.json': '{"a":["alpha"],"c":"echo"}',
        })

        const key = 'a'
        const cache = new Cache({
          dataDir: './data',
          filename: './file.json',
          formatters: [{ name: key, formatter }],
        })
        const val = 'hotel'

        cache.set(key, val)

        expect(cache.get(key)).toStrictEqual({ [key]: val })

        cache.load(() => {
          expect(logger.error).toHaveBeenCalledTimes(1)
          expect(cache.get(key)).toStrictEqual({
            [key]: ['foxtrot', 'golf', 'quebec', 'alpha'],
          })

          fs.resetMockFiles()

          resolve()
        })
      }))

    test('should load the cache file', () =>
      new Promise(resolve => {
        fs.setMockFiles({ './file.json': '{"a":"yankee"}' })

        const cache = new Cache({ filename: './file.json' })
        const key = 'a'
        const val = 'romeo'

        cache.set(key, val)

        expect(cache.get(key)).toStrictEqual({ [key]: val })

        cache.load(() => {
          expect(cache.get(key)).toStrictEqual({ [key]: 'yankee' })

          fs.resetMockFiles()

          resolve()
        })
      }))
  })

  describe('mset', () => {
    test('should set the keys to the provided values', () => {
      const cache = new Cache()
      const vals = { a: { d: 4 }, b: 'oscar', c: ['kilo'] }
      const keys = Object.keys(vals)

      cache.mset(keys, vals)

      for (const element of keys) {
        expect(cache.get(element)).toStrictEqual({ [element]: vals[element] })
      }
    })
  })

  describe('set', () => {
    test('should set the key to the provided value', () => {
      const cache = new Cache()
      const key = 'a'
      const val = 'tango'

      cache.set(key, val)

      expect(cache.get(key)).toStrictEqual({ [key]: val })
    })
  })
})
