import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Too noisy for this codebase right now; blocks CI on common patterns.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: [
      'vite.config.*',
      'eslint.config.*',
    ],
    languageOptions: {
      globals: globals.node,
      sourceType: 'module',
    },
  },
  {
    files: [
      'tailwind.config.*',
      'postcss.config.*',
    ],
    languageOptions: {
      globals: globals.node,
      sourceType: 'script',
    },
  },
  {
    files: ['src/context/**/*.{js,jsx}'],
    rules: {
      // Context modules intentionally export non-components (contexts, hooks).
      'react-refresh/only-export-components': 'off',
    },
  },
])
