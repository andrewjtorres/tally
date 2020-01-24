'use strict'

const Tags = require('./js-tags')

describe('Tags', () => {
  describe('maxLength', () => {
    test('should return the max length of the keys', () => {
      const tags = new Tags()

      tags.add('bravo', 2)

      expect(tags.maxLength).toBe(5)
    })
  })

  describe('add', () => {
    test('should update the max length of the keys', () => {
      const tags = new Tags()

      tags.add('tango', 4)

      expect(tags.maxLength).toBe(5)

      tags.add('foxtrot', 9)

      expect(tags.maxLength).toBe(7)
    })

    test('should add key-value pair', () => {
      const key = 'india'
      const tags = new Tags()

      expect(tags.get(key)).toBeNull()

      tags.add(key, 9)

      expect(tags.get(key)).toBe(9)
    })

    test('should add value to the count associated to key', () => {
      const key = 'november'
      const tags = new Tags()

      tags.add(key, 1)

      expect(tags.get(key)).toBe(1)

      tags.add(key, 14)

      expect(tags.get(key)).toBe(15)
    })
  })

  describe('get', () => {
    test('should return null', () => {
      const tags = new Tags()

      expect(tags.get('juliet')).toBeNull()
    })

    test('should return the count associated to key', () => {
      const key = 'lima'
      const tags = new Tags()
      const val = 8

      tags.add(key, val)

      expect(tags.get(key)).toBe(val)
    })
  })

  describe('sort', () => {
    test('should return an array of objects sorted in ascending order', () => {
      const tags = new Tags()

      tags.add('oscar', 6)
      tags.add('romeo', 2)
      tags.add('victor', 6)

      expect(tags.sort()).toStrictEqual([
        { name: 'romeo', count: 2 },
        { name: 'oscar', count: 6 },
        { name: 'victor', count: 6 },
      ])
    })

    test('should return an array of objects sorted in descending order', () => {
      const tags = new Tags()

      tags.add('whiskey', 8)
      tags.add('charlie', 1)
      tags.add('zulu', 5)

      expect(tags.sort(false)).toStrictEqual([
        { name: 'whiskey', count: 8 },
        { name: 'zulu', count: 5 },
        { name: 'charlie', count: 1 },
      ])
    })
  })

  describe('toString', () => {
    test('should return an array of objects sorted in ascending order represented as a string', () => {
      const tags = new Tags()

      tags.add('golf', 12)
      tags.add('hotel', 9)

      expect(tags.toString()).toMatchInlineSnapshot(`
        hotel  9
        golf   12

      `)
    })

    test('should return an array of objects sorted in descending order represented as a string', () => {
      const tags = new Tags()

      tags.add('mike', 11)
      tags.add('xray', 5)

      expect(tags.toString(false)).toMatchInlineSnapshot(`
        mike  11
        xray  5

      `)
    })
  })
})
