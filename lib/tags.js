'use strict';

class Tags {

  constructor() {
    this._data = {};
    this._maxLength = 0;
  }

  /**
   * Returns the max length of the keys
   * @returns {number}
   */
  get maxLength() {
    return this._maxLength;
  }

  /**
   * Adds the provided value to the count associated to
   * key, otherwise adds the key-value pair
   * @param {string} key
   * @param {number} val
   * @returns {void}
   */
  add(key, val = 0) {
    if (this._maxLength < key.length) {
      this._maxLength = key.length;
    }

    this._data[key] = key in this._data ? this._data[key] + val : val;
  }

  /**
   * Returns the count associated to the provided key,
   * otherwise returns null
   * @param {string} key
   * @returns {number|null}
   */
  get(key) {
    return key in this._data ? this._data[key] : null;
  }

  /**
   * Returns a sorted array of objects containing name and
   * count values
   * @param {boolean} order
   * @returns {Array}
   */
  sort(order = true) {
    return Object.keys(this._data).sort((a, b) => (
      order ? this._data[a] - this._data[b] : this._data[b] - this._data[a]
    )).map(key => (
      { name: key, count: this._data[key] }
    ));
  }

  /**
   * Returns a sorted array of objects containing name and
   * count values represented as a string
   * @param {boolean} order
   * @returns {string}
   */
  toString(order = true) {
    return this.sort(order).reduce((acc, val, i, arr) => (
      `${acc}${arr[i].name.padEnd(this._maxLength + 2, ' ')}${arr[i].count}\n`
    ), '');
  }

}

module.exports = Tags;
