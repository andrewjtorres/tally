'use strict';

/**
 * Wrapper for console.error
 * @returns {void}
 */
function error() {
  console.error.apply(console, Array.prototype.slice.call(arguments));
}

/**
 * Wrapper for console.log
 * @returns {void}
 */
function info() {
  console.log.apply(console, Array.prototype.slice.call(arguments));
}

module.exports = {
  error,
  info,
};
