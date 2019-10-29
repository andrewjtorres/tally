'use strict'

const { basename } = require('path')

module.exports = {
  process: (_sourceText, sourcePath) => {
    const filename = JSON.stringify(basename(sourcePath))

    return `module.exports = ${filename};`
  },
}
