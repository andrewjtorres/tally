'use strict';

const fs = require('fs');
const path = require('path');
const log = require('./log');
const { readFiles } = require('./util/file-util');
const { mprepend } = require('./util/string-util');

/**
 * Returns the accumulated results of the formatted cache
 * @param {Function} formatter
 * @param {Object}   cache
 * @returns {*}
 */
function formatCache(formatter, cache) {
  return cache.reduce((acc, val) => {
    if (val.err) {
      log.error(val.err);

      return acc;
    }

    try {
      acc = formatter(acc, JSON.parse(val.data));
    } catch (err) {
      log.error(err);
    }

    return acc;
  }, null);
}

/**
 * Asynchronously reads the contents of the data directory
 * @param {string}   dataDir
 * @param {Function} callback
 * @returns {void}
 */
function readDataDir(dataDir, callback) {
  fs.readdir(dataDir, (err, files) => {
    if (err) {
      return log.error(err);
    }

    readFiles(mprepend(files, `${dataDir}${path.sep}`), 'utf-8', callback);
  });
}

class Cache {

  constructor(conf = {}) {
    this._data = {};
    this._dataDir = conf.dataDir || '';
    this._file = conf.file || '';
    this._formatters = conf.formatters || [];
  }

  /**
   * Returns an object containing the key-value pair,
   * otherwise returns null
   * @param {string} key
   * @returns {*}
   */
  get(key) {
    return (this._data !== null && key in this._data) ? {[key]: this._data[key]} : null;
  }

  /**
   * Sets multiple keys to the provided values
   * @param {Array}  keys
   * @param {Object} vals
   * @returns {void}
   */
  mset(keys, vals) {
    const length = keys.length;

    for (let i = 0; i < length; ++i) {
      this.set(keys[i], vals[keys[i]]);
    }
  }

  /**
   * Sets the key to the provided value
   * @param {string} key
   * @param {*}      val
   * @returns {void}
   */
  set(key, val) {
    this._data[key] = val;
  }

  /**
   * Asynchronously writes data to a file, replacing the
   * file if it already exists
   * @param callback
   * @returns {void}
   */
  write(callback) {
    fs.writeFile(this._file, JSON.stringify(this._data), callback);
  }

  /**
   * Loads the cache file, otherwise reads the files in the
   * data directory
   * @param {Function} callback
   * @returns {*}
   */
  load(callback) {
    fs.readFile(this._file, 'utf-8', (err, data) => {
      if (!err) {
        const content = JSON.parse(data);

        this.mset(Object.keys(content), content);
        return callback();
      }

      readDataDir(this._dataDir, cache => {
        const length = this._formatters.length;

        for (let i = 0; i < length; ++i) {
          this.set(this._formatters[i].name, formatCache(this._formatters[i].formatter, cache));
        }

        callback();
      });
    });
  }

}

module.exports = Cache;
