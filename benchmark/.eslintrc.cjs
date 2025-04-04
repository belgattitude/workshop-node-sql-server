
// Workaround for https://github.com/eslint/eslint/issues/3458
require('@belgattitude/eslint-config-bases/patch/modern-module-resolution');

const {
  getDefaultIgnorePatterns,
} = require('@belgattitude/eslint-config-bases/helpers');

module.exports = {
  extends: [
    '@belgattitude/eslint-config-bases/typescript',
    '@belgattitude/eslint-config-bases/simple-import-sort',
    '@belgattitude/eslint-config-bases/import-x',
    // '@belgattitude/eslint-config-bases/perfectionist',
    '@belgattitude/eslint-config-bases/sonar',
    '@belgattitude/eslint-config-bases/regexp',
    '@belgattitude/eslint-config-bases/jest',
    '@belgattitude/eslint-config-bases/react',
    '@belgattitude/eslint-config-bases/rtl',
    // Add specific rules for nextjs
    'next/core-web-vitals',
    // Apply prettier and disable incompatible rules
    '@belgattitude/eslint-config-bases/prettier-plugin',
  ],
  ignorePatterns: [...getDefaultIgnorePatterns()],
  overrides: [
    {
      files: ['**/src/generated/openapi/*'],
      rules: {
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        'sonarjs/class-name': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    projectService: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    // optional overrides per project
    'sonarjs/todo-tag': 'off',
  },
};
