'use strict';

/**
 * Returns an array of strings with the provided data
 * prepended to each
 * @param {Array}  strs
 * @param {string} data
 * @returns {Array}
 */
const mprepend = (strs, data) => (
  strs.map((val) => (
    prepend(val, data)
  ))
);

/**
 * Returns a string with the provided padding applied to
 * the end (right). The padding is applied repeatedly until
 * the desired length is met.
 *
 *  NOTE: The padEnd() method is an experimental
 *  technology and it's specification has not
 *  stabilized.
 *
 * @param {string} str
 * @param {number} length
 * @param {string} pad
 * @returns {string}
 */
const padEnd = (str, length, pad = ' ') => (
  str.padEnd(length, pad)
);

/**
 * Returns a string with the provided padding applied to
 * the start (left). The padding is applied repeatedly
 * until the desired length is met.
 *
 *  NOTE: The padStart() method is an experimental
 *  technology and it's specification has not
 *  stabilized.
 *
 * @param {string} str
 * @param {number} length
 * @param {string} pad
 * @returns {string}
 */
const padStart = (str, length, pad = ' ') => (
  str.padStart(length, pad)
);

/**
 * Returns a string with the provided data prepended
 * @param {string} str
 * @param {string} data
 * @returns {string}
 */
const prepend = (str, data) => (
  `${data}${str}`
);

module.exports = {
  mprepend,
  padEnd,
  padStart,
  prepend,
};
