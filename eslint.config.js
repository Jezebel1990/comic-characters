import globals from 'globals'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2021, // Habilita recursos do ES6+
      sourceType: 'module',
      globals: globals.browser,
      parser: typescriptEslintParser
    },
    ignores: ['dist', '.eslint.config.js'],
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      'react-hooks': eslintPluginReactHooks,
      prettier: eslintPluginPrettier
    },
    rules: {
      'no-console': 'off',
      'no-magic-numbers': 'off',
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          caughtErrors: 'none'
        }
      ]
    }
  }
]
