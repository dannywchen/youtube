export default {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['react', 'react-hooks'],
    rules: {
      // Add any specific rules here
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }