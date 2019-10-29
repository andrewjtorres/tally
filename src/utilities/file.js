'use strict'

const fs = require('fs')

/**
 * Asynchronously reads the entire contents of an array of paths and provides
 * the callback with an array of objects containing corresponding error and
 * data values
 *
 * @param {Array}         paths
 * @param {Object|string} opts
 * @param {Function}      callback
 * @returns {*}
 */
const readFiles = (paths, opts, callback) => {
  if (paths.length === 0) {
    return callback([]) // eslint-disable-line standard/no-callback-literal
  }

  const results = []
  let read = 0

  for (const [i, element] of paths.entries()) {
    fs.readFile(element, opts, (err, data) => {
      results[i] = { err, data }

      if (++read === paths.length) {
        callback(results)
      }
    })
  }
}

module.exports = { readFiles }
