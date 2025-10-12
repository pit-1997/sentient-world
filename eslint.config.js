import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import importPlugin from 'eslint-plugin-import-x';
import pluginJest from 'eslint-plugin-jest';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

const devFiles = [
  'eslint.config.js',
  'jest.config.ts',
  'packages/**/*.test.ts',
  'packages/**/*.spec.ts',
  'packages/**/__tests__/**/*.ts',
  'packages/**/dev/**/*.ts',
];

export default defineConfig([
  {
    ignores: ['**/node_modules/', '**/dist/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  prettierPlugin,
  {
    files: ['**/*.ts'],
    plugins: {
      '@eslint-community/eslint-comments': eslintComments,
      '@typescript-eslint': tseslint.plugin,
      'import-x': importPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    settings: {
      'import-x/resolver': {
        typescript: true,
      },
    },
    rules: {
      // ESLint comments rules
      '@eslint-community/eslint-comments/require-description': 'error',

      // TypeScript rules
      '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      '@typescript-eslint/no-non-null-assertion': 'off',

      // Core rules
      'func-style': ['error', 'declaration'],
      'no-console': 'error',
      'no-use-before-define': 'off',

      // Import rules
      'import-x/order': [
        'error',
        {
          'newlines-between': 'always-and-inside-groups',
          groups: [
            ['builtin', 'external'],
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import-x/no-default-export': 'error',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: devFiles,
          packageDir: ['./', './packages/*'],
          peerDependencies: true,
        },
      ],
    },
  },
  // Конфигурационные файлы
  {
    files: ['**/eslint.config.js', '**/jest.config.ts'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  // Правила для прод-файлов
  {
    files: ['**/*.ts'],
    ignores: devFiles,
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'error',
    },
  },
  // Правила для файлов с тестами
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    ...pluginJest.configs['flat/all'],
    rules: {
      ...pluginJest.configs['flat/all'].rules,
      'jest/valid-title': ['error', { ignoreTypeOfDescribeName: true }],
    },
  },
]);
