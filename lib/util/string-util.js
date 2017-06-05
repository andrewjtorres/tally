'use strict';

/**
 * Returns an array of strings with the provided data
 * prepended to each
 * @param {Array}  strs
 * @param {string} data
 * @returns {Array}
 */
function mprepend(strs, data) {
  return strs.map((val) => (
    prepend(val, data)
  ));
}

/**
 * Returns a string with the provided data prepended
 * @param {string} str
 * @param {string} data
 * @returns {string}
 */
function prepend(str, data) {
  return `${data}${str}`;
}

module.exports = {
  mprepend,
  prepend,
};
