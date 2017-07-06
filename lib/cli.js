'use strict';

const path = require('path');
const Cache = require('./cache');
const Options = require('./options');
const Tags = require('./tags');
const log = require('./log');
const {flattenArray} = require('./util/object-util');

const cacheFile = path.resolve(__dirname, '../data/cache.json');
const dataDir = path.resolve(__dirname, '../data/flat-files');
const optionsFile = path.resolve(__dirname, '../data/tags.txt');

/**
 * Returns an object containing name and count values
 * @param {Object} tags
 * @param {Object} data
 * @returns {Object}
 */
function formatTags(tags, data) {
  return flattenArray('tags', data).reduce((acc, val) => {
    acc[val] = val in acc ? acc[val] + 1 : 1;

    return acc;
  }, tags === null ? {} : tags);
}

/**
 * Cross references the provided tag options against the
 * cached data and outputs the corresponding name and count
 * values in descending order
 * @param {Array}  opts
 * @param {Object} data
 * @returns {void}
 */
function processTags(opts, data) {
  const tags = new Tags();
  const length = opts.length;

  for (let i = 0; i < length; ++i) {
    tags.add(opts[i], opts[i] in data ? data[opts[i]] : 0);
  }

  log.info(tags.toString(false));
}

/**
 * Executes the CLI based on the provided array of
 * arguments
 * @param {Array} args
 * @returns {void}
 */
function execute(args) {
  const cache = new Cache({dataDir, file: cacheFile, formatters: [{
    name: 'tags', formatter: formatTags
  }]});
  const options = new Options({file: optionsFile});

  options.parse(args, () => cache.load(() => cache.write(() => {
    processTags(options.get('tags').tags, cache.get('tags').tags);
  })));
}

module.exports = {
  execute
};
