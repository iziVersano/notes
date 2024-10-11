import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    // Specify the files to lint
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],

    // Set the parser for TypeScript
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    // Define the plugins used
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      prettier: eslintPluginPrettier,
      '@typescript-eslint': typescriptEslintPlugin,
    },

    // Define the rules
    rules: {
      'prettier/prettier': 'error', // Integrate Prettier with ESLint
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
      '@typescript-eslint/no-unused-vars': ['error'], // TypeScript rule for unused variables
      'react/prop-types': 'off', // Disable prop-types since we use TypeScript
      ...eslintConfigPrettier.rules, // Spread Prettier's rule overrides to disable conflicting rules
    },

    // Plugin-specific settings
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];
