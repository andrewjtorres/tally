'use strict'

/**
 * Returns a deeply flattened array of values associated with the provided key
 *
 * @param {number|string} key
 * @param {Object}        obj
 * @returns {Array}
 */
const flattenArrayDeep = (key, obj) => {
  const keys = Object.keys(obj)
  let acc = []

  for (const element of keys) {
    if (obj[element] !== null && typeof obj[element] === 'object') {
      if (element === key && Array.isArray(obj[element])) {
        acc = acc.concat(obj[element])
      }

      acc = acc.concat(flattenArrayDeep(key, obj[element]))
    }
  }

  return acc
}

module.exports = { flattenArrayDeep }
