'use strict'

const { defaults } = require('jest-config')

module.exports = {
  collectCoverageFrom: ['lib/**/*.js'],
  coverageDirectory: 'coverage',
  errorOnDeprecated: true,
  moduleDirectories: [...defaults.moduleDirectories, '<rootDir>/lib'],
  restoreMocks: true,
  testMatch: ['<rootDir>/lib/**/*(*.)test.js'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^(?!.*\\.(js|json)$)': '<rootDir>/config/jest/file-transformer.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
