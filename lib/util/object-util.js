'use strict';

/**
 * Returns a deeply flattened array of values associated
 * with the provided key
 * @param {number|string} key
 * @param {Object}        obj
 * @returns {Array}
 */
function flattenArray(key, obj) {
  const keys = Object.keys(obj);
  const length = keys.length;
  let acc = [];

  for (let i = 0; i < length; ++i) {
    if (obj[keys[i]] !== null && typeof obj[keys[i]] === 'object') {
      if (keys[i] === key && Array.isArray(obj[keys[i]])) {
        acc = acc.concat(obj[keys[i]]);
      }

      acc = acc.concat(flattenArray(key, obj[keys[i]]));
    }
  }

  return acc;
}

module.exports = {
  flattenArray,
};
