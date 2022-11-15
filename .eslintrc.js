module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:i18next/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
  ],
  rules: {
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'max-len': ['error', { ignoreComments: true, code: 100 }],
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreAttribute: [
          'data-testid',
          'variant',
          'size',
          'color',
        ],
      },
    ],
  },
  globals: {
    __IS_DEV__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
  ignorePatterns: ['**/configs/templates'],
};
