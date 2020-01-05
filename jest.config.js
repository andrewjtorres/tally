'use strict'

const { defaults } = require('jest-config')

module.exports = {
  collectCoverageFrom: ['src/**/*.?(js|ts)'],
  coverageDirectory: 'coverage',
  errorOnDeprecated: true,
  globals: { 'ts-jest': { tsConfig: 'tsconfig.jest.json' } },
  moduleDirectories: [...defaults.moduleDirectories, '<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/lib'],
  restoreMocks: true,
  testMatch: ['<rootDir>/src/**/*(*.)test.?(js|ts)'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^(?!.*\\.(js|json|ts)$)': '<rootDir>/config/jest/file-transformer.js',
    '^.+\\.ts$': require.resolve('ts-jest'),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
