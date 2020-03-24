'use strict'

/**
 * Returns a string with the provided data prepended
 *
 * @param {string} str
 * @param {string} data
 * @returns {string}
 */
const prepend = (str, data) => `${data}${str}`

/**
 * Returns an array of strings with the provided data prepended to each
 *
 * @param {Array}  strs
 * @param {string} data
 * @returns {Array}
 */
const mprepend = (strs, data) => strs.map((value) => prepend(value, data))

/**
 * Returns an array containing substrings of the provided string
 *
 * @param {string} str
 * @param {string} delimiter
 * @returns {Array}
 */
const parseDelimitedString = (str, delimiter) =>
  str.split(new RegExp(`[${delimiter}]+`)).filter(Boolean)

module.exports = { mprepend, parseDelimitedString, prepend }
