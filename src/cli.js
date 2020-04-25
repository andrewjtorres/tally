'use strict'

const { resolve } = require('path')

const log = require('./logger')
const Cache = require('./models/cache')
const Options = require('./models/options')
const Tags = require('./models/js-tags')
const { flattenArrayDeep } = require('./utils/object')

const cacheFilename = resolve(__dirname, '../data/cache.json')
const dataDir = resolve(__dirname, '../data/flat-files')
const optsFilename = resolve(__dirname, '../data/tags.txt')

/**
 * Returns an object containing name and count values
 *
 * @param {Object} tags
 * @param {Object} data
 * @returns {Object}
 */
const formatTags = (tags, data) =>
  flattenArrayDeep('tags', data).reduce(
    (acc, value) => ({ ...acc, [value]: value in acc ? acc[value] + 1 : 1 }),
    tags || {}
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

  for (const element of opts) {
    tags.add(element, element in data ? data[element] : 0)
  }

  log.info(tags.toString(false))
}

/**
 * Executes the CLI based on the provided array of arguments
 *
 * @param {Array} args
 * @returns {void}
 */
const execute = (args) => {
  const cache = new Cache({
    dataDir,
    filename: cacheFilename,
    formatters: [{ formatter: formatTags, name: 'tags' }],
  })
  const options = new Options({ filename: optsFilename })

  options.parse(args, () =>
    cache.load(() =>
      cache.write(() => {
        processTags(options.get('tags').tags, cache.get('tags').tags)
      })
    )
  )
}

module.exports = { execute }
