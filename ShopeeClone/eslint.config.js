import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      'jsx-a11y': jsxA11y,
      'import': importPlugin,
      'prettier': prettier
    },
    rules: {
      // Các rules cơ bản từ eslint
      ...js.configs.recommended.rules,

      // TypeScript rules
      ...tseslint.configs.recommended[0].rules,
      '@typescript-eslint/no-non-null-assertion': 'off', // Tắt cảnh báo về non-null assertion operator (!)

      // React hooks rules
      ...reactHooks.configs.recommended.rules,

      // React-refresh rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // React rules
      // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
      'react/jsx-no-target-blank': 'warn',
      // Tắt rule yêu cầu import React trong file jsx
      'react/react-in-jsx-scope': 'off',

      // Prettier rules
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
)