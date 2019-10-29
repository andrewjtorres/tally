'use strict'

/**
 * Wrapper for console.error
 *
 * @returns {void}
 */
const error = (...args) =>
  console.error.apply(console, Array.prototype.slice.call(...args))

/**
 * Wrapper for console.log
 *
 * @returns {void}
 */
const info = (...args) =>
  console.info.apply(console, Array.prototype.slice.call(...args))

module.exports = { error, info }
