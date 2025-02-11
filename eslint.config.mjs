import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['.tests/'],
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      'no-unused-vars': 'warn',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
