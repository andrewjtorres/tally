'use strict'

const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const prettierTypescriptConfig = require('eslint-config-prettier/@typescript-eslint')
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
      files: ['**/*.ts', '**/.*/**/*.ts'],
      parser: typescriptPlugin.configs.base.parser,
      parserOptions: { project: 'tsconfig.?(jest|node).json' },
      plugins: typescriptPlugin.configs.base.plugins,
      rules: {
        ...typescriptPlugin.configs.recommended.rules,
        ...typescriptPlugin.configs['recommended-requiring-type-checking']
          .rules,
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import/named': 'off',
        ...prettierTypescriptConfig.rules,
      },
    },
    {
      files: [
        'config/jest/**/*.?(js|ts)',
        'src/**/__mocks__/**/*.?(js|ts)',
        'src/**/?(*.)test.?(js|ts)',
      ],
      globals: jestPlugin.environments.globals.globals,
      plugins: jestPlugin.configs.recommended.plugins,
      rules: jestPlugin.configs.recommended.rules,
    },
  ],
  settings: {
    'import/extensions': ['.d.ts', '.js', '.ts'],
    'import/parsers': { '@typescript-eslint/parser': ['.d.ts', '.ts'] },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        directory: 'tsconfig.?(jest|node).json',
      },
    },
  },
}
