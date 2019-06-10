'use strict'

module.exports = {
  collectCoverageFrom: ['lib/**/*.js'],
  coverageDirectory: 'coverage',
  errorOnDeprecated: true,
  restoreMocks: true,
  testMatch: ['<rootDir>/lib/**/?(*.)test.js'],
  testRunner: 'jest-circus/runner',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
