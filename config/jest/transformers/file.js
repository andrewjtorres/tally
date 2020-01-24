'use strict'

const { basename } = require('path')

module.exports = {
  process: (_sourceText, sourcePath) =>
    `module.exports = ${JSON.stringify(basename(sourcePath))};`,
}
