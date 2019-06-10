'use strict'

const jestPlugin = require('eslint-plugin-jest')

module.exports = {
  extends: [
    'standard',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/standard',
    'prettier/unicorn',
  ],
  overrides: [
    {
      files: ['lib/**/__mocks__/**/*.js', 'lib/**/?(*.)test.js'],
      globals: jestPlugin.environments.globals.globals,
      plugins: jestPlugin.configs.recommended.plugins,
      rules: jestPlugin.configs.recommended.rules,
    },
  ],
  plugins: ['import', 'prettier', 'promise', 'standard', 'unicorn'],
  rules: {
    'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
    'no-param-reassign': ['error', { props: true }],
    'import/order': [
      'error',
      { groups: [['builtin', 'external']], 'newlines-between': 'always' },
    ],
    'unicorn/prevent-abbreviations': 'off',
    'prettier/prettier': 'error',
  },
}
