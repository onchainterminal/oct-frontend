// ESLint is a tool for identifying and reporting on patterns
// found in ECMAScript/JavaScript code, with the goal of making
// code more consistent and avoiding bugs.
// Learn more at: https://eslint.org

import globals from 'globals';
import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import eslintPretty from 'eslint-config-prettier';

// Export configuration for use by ESLint and IDE.
export default eslintTs.config(
  { ignores: ['**/.nuxt', '**/dist', 'public/**'] },
  { languageOptions: { globals: globals.node } },
  ...[eslintJs.configs.recommended, eslintPretty],
  ...eslintTs.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }]
    }
  }
);
