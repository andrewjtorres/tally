'use strict'

const { defaults } = require('jest-config')

module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  errorOnDeprecated: true,
  moduleDirectories: [...defaults.moduleDirectories, '<rootDir>/src'],
  restoreMocks: true,
  testMatch: ['<rootDir>/src/**/*(*.)test.js'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^(?!.*\\.(js|json)$)': '<rootDir>/config/jest/file-transformer.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
