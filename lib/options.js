'use strict'

const fs = require('fs')

const log = require('./log')

/**
 * Returns an array containing substrings of the provided string
 *
 * @param {string} str
 * @param {string} delim
 * @returns {Array}
 */
const parseDelimitedString = (str, delim) =>
  str.split(new RegExp(`[${delim}]+`)).filter(Boolean)

class Options {
  constructor({ file = '' } = {}) {
    this._data = {}
    this._file = file
  }

  /**
   * Returns an object containing the key-value pair, otherwise returns null
   *
   * @param {string} key
   * @returns {*}
   */
  get(key) {
    return key in this._data ? { [key]: this._data[key] } : null
  }

  /**
   * Parses the last value in the provided arguments array, otherwise parses
   * the default tags file
   *
   *  NOTE: The function makes a few assumptions due to the
   *  application expecting only a single "tags" argument.
   *  Specifically it only parses the last argument,
   *  expects the last argument to be comma delimited,
   *  ignores additional arguments, and by default
   *  associates the parsed argument to a "tags" key.
   *
   * @param {Array}    args
   * @param {Function} callback
   * @returns {*}
   */
  parse(args, callback) {
    if (args.length >= 3) {
      this._data.tags = parseDelimitedString(args[args.length - 1], ',')

      return callback()
    }

    fs.readFile(this._file, 'utf-8', (err, data) => {
      if (err) {
        return log.error(err)
      }

      this._data.tags = parseDelimitedString(data, '\n')

      callback()
    })
  }
}

module.exports = Options
