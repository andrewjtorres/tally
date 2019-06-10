'use strict'

const { readFiles } = require('./file')

describe('readFiles', () => {
  test('should provide an empty array', done => {
    readFiles([], 'utf-8', data => {
      expect(data).toStrictEqual([])

      done()
    })
  })

  test('should provide an array of objects containing error and data values', done => {
    readFiles(['./file.ini', './file.json', './file.txt'], 'utf-8', data => {
      expect(data.length).toStrictEqual(3)

      for (const element of data) {
        expect(element).toHaveProperty('data')
        expect(element).toHaveProperty('err')
      }

      done()
    })
  })
})
