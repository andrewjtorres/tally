'use strict'

const fs = require('fs')
const { sep } = require('path')

const logger = require('../logger')
const { readFiles } = require('../utils/file')
const { mprepend } = require('../utils/string')

/**
 * Returns the accumulated results of the formatted cache
 *
 * @param {Function} formatter
 * @param {Object}   cache
 * @returns {*}
 */
const formatCache = (formatter, cache) =>
  cache.reduce((acc, val) => {
    if (val.err) {
      logger.error(val.err)

      return acc
    }

    try {
      acc = formatter(acc, JSON.parse(val.data)) // eslint-disable-line no-param-reassign
    } catch (error) {
      logger.error(error)
    }

    return acc
  }, null)

/**
 * Asynchronously reads the contents of the data directory
 *
 * @param {string}   dataDir
 * @param {Function} callback
 * @returns {void}
 */
const readDataDirectory = (dataDir, callback) =>
  fs.readdir(dataDir, (err, files) => {
    if (err) {
      return logger.error(err)
    }

    readFiles(mprepend(files, `${dataDir}${sep}`), 'utf-8', callback)
  })

class Cache {
  constructor({ dataDir = '', filename = '', formatters = [] } = {}) {
    this._data = {}
    this._dataDir = dataDir
    this._filename = filename
    this._formatters = formatters
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
   * Loads the cache file, otherwise reads the files in the data directory
   *
   * @param {Function} callback
   * @returns {*}
   */
  load(callback) {
    fs.readFile(this._filename, 'utf-8', (err, data) => {
      if (!err) {
        const content = JSON.parse(data)

        this.mset(Object.keys(content), content)

        return callback()
      }

      readDataDirectory(this._dataDir, (cache) => {
        for (const { formatter, name } of this._formatters) {
          this.set(name, formatCache(formatter, cache))
        }

        callback()
      })
    })
  }

  /**
   * Sets multiple keys to the provided values
   *
   * @param {Array}  keys
   * @param {Object} vals
   * @returns {void}
   */
  mset(keys, vals) {
    for (const element of keys) {
      this.set(element, vals[element])
    }
  }

  /**
   * Sets the key to the provided value
   *
   * @param {string} key
   * @param {*}      val
   * @returns {void}
   */
  set(key, val) {
    this._data[key] = val
  }

  /**
   * Asynchronously writes data to a file, replacing the file if it already
   * exists
   *
   * @param callback
   * @returns {void}
   */
  write(callback) {
    fs.writeFile(this._filename, JSON.stringify(this._data), callback)
  }
}

module.exports = Cache
