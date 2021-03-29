'use strict'

const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const prettierConfig = require('eslint-config-prettier')
const jestPlugin = require('eslint-plugin-jest')

module.exports = {
  plugins: ['import', 'prettier', 'promise', 'unicorn'],
  env: { node: true },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['!**/.*', '.git'],
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
      files: ['*.ts'],
      parser: typescriptPlugin.configs.base.parser,
      parserOptions: { project: 'tsconfig.?(jest|node).json' },
      plugins: typescriptPlugin.configs.base.plugins,
      rules: {
        ...typescriptPlugin.configs.recommended.rules,
        ...typescriptPlugin.configs['eslint-recommended'].overrides[0].rules,
        ...typescriptPlugin.configs['recommended-requiring-type-checking']
          .rules,
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import/named': 'off',
        ...prettierConfig.rules,
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
        project: 'tsconfig.?(jest|node).json',
      },
    },
  },
}
