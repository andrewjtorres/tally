'use strict'

const fs = require('fs')

/**
 * Asynchronously reads the entire contents of an array of files and provides
 * the callback with an array of objects containing corresponding error and
 * data values
 *
 * @param {Array}         files
 * @param {Object|string} opts
 * @param {Function}      callback
 * @returns {*}
 */
const readFiles = (files, opts, callback) => {
  if (files.length === 0) {
    return callback([])
  }

  const results = []
  const total = files.length
  let read = 0

  for (let i = 0; i < total; ++i) {
    fs.readFile(files[i], opts, (err, data) => {
      results[i] = { err, data }

      if (++read === total) {
        callback(results)
      }
    })
  }
}

module.exports = { readFiles }
