'use strict'

const jestPlugin = require('eslint-plugin-jest')

module.exports = {
  plugins: ['import', 'prettier', 'promise', 'standard', 'unicorn'],
  extends: [
    'standard',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/standard',
    'prettier/unicorn',
  ],
  rules: {
    'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
    'no-param-reassign': ['error', { props: true }],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index', 'unknown'],
        ],
        'newlines-between': 'always',
      },
    ],
    'unicorn/prevent-abbreviations': 'off',
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: [
        'config/jest/**/*.js',
        'lib/**/__mocks__/**/*.js',
        'lib/**/?(*.)test.js',
      ],
      globals: jestPlugin.environments.globals.globals,
      plugins: jestPlugin.configs.recommended.plugins,
      rules: jestPlugin.configs.recommended.rules,
    },
  ],
}
