'use strict'

module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: { branches: 100, functions: 100, lines: 100, statements: 100 },
  },
  errorOnDeprecated: true,
  globals: {
    'ts-jest': { tsconfig: 'tsconfig.jest.json' },
  },
  modulePathIgnorePatterns: ['<rootDir>/lib'],
  restoreMocks: true,
  snapshotSerializers: ['<rootDir>/config/jest/snapshot-serializers/string.js'],
  testMatch: ['<rootDir>/src/**/*(*.)test.?(js|ts)'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^(?!.*\\.(js|json|ts)$)': '<rootDir>/config/jest/transformers/file.js',
    '^.+\\.ts$': require.resolve('ts-jest'),
  },
}
