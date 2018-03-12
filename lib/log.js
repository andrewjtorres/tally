'use strict';

/**
 * Wrapper for console.error
 * @returns {void}
 */
function error(...args) {
  console.error.apply(console, Array.prototype.slice.call(...args));
}

/**
 * Wrapper for console.log
 * @returns {void}
 */
function info(...args) {
  console.log.apply(console, Array.prototype.slice.call(...args));
}

module.exports = {
  error,
  info
};
