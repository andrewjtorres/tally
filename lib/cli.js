'use strict'

const path = require('path')

const Cache = require('./cache')
const log = require('./log')
const Options = require('./options')
const Tags = require('./tags')
const { flattenArray } = require('./utilities/object')

const cacheFile = path.resolve(__dirname, '../data/cache.json')
const dataDir = path.resolve(__dirname, '../data/flat-files')
const optsFile = path.resolve(__dirname, '../data/tags.txt')

/**
 * Returns an object containing name and count values
 *
 * @param {Object} tags
 * @param {Object} data
 * @returns {Object}
 */
const formatTags = (tags, data) =>
  flattenArray('tags', data).reduce(
    (acc, value) => ({ ...acc, [value]: value in acc ? acc[value] + 1 : 1 }),
    tags === null ? {} : tags
  )

/**
 * Cross references the provided tag options against the cached data and
 * outputs the corresponding name and count values in descending order
 *
 * @param {Array}  opts
 * @param {Object} data
 * @returns {void}
 */
const processTags = (opts, data) => {
  const tags = new Tags()
  const { length } = opts

  for (let i = 0; i < length; ++i) {
    tags.add(opts[i], opts[i] in data ? data[opts[i]] : 0)
  }

  log.info(tags.toString(false))
}

/**
 * Executes the CLI based on the provided array of arguments
 *
 * @param {Array} args
 * @returns {void}
 */
const execute = args => {
  const cache = new Cache({
    dataDir,
    file: cacheFile,
    formatters: [{ formatter: formatTags, name: 'tags' }],
  })
  const options = new Options({ file: optsFile })

  options.parse(args, () =>
    cache.load(() =>
      cache.write(() => {
        processTags(options.get('tags').tags, cache.get('tags').tags)
      })
    )
  )
}

module.exports = { execute }
