'use strict'

const { basename, dirname } = require('path')

const fs = jest.createMockFromModule('fs')
let mockFiles = Object.freeze(Object.create(null))

fs.readFile = (path, opts, callback) => {
  const dir = mockFiles[dirname(path)]
  const error = new Error('ENOENT: no such file or directory')

  error.code = 'ENOENT'
  error.errno = -2
  error.path = path
  error.syscall = 'open'

  if (dir) {
    const content = dir[basename(path)]

    return content ? callback(undefined, content) : callback(error)
  }

  return callback(error)
}

fs.readdir = (path, callback) => {
  const dir = mockFiles[path]
  const error = new Error('ENOENT: no such file or directory')

  error.code = 'ENOENT'
  error.errno = -2
  error.path = path
  error.syscall = 'scandir'

  return dir ? callback(undefined, Object.keys(dir)) : callback(error)
}

fs.resetMockFiles = () => {
  mockFiles = Object.freeze(Object.create(null))
}

fs.setMockFiles = (files) => {
  mockFiles = Object.create(null)

  for (const element in files) {
    const dir = dirname(element)

    if (!mockFiles[dir]) {
      mockFiles[dir] = []
    }

    mockFiles[dir][basename(element)] = files[element]
  }

  Object.freeze(mockFiles)
}

module.exports = fs
