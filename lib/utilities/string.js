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
const mprepend = (strs, data) => strs.map(value => prepend(value, data))

module.exports = { mprepend, prepend }
