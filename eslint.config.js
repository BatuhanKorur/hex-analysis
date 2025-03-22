import globals from 'globals'
import tseslint from 'typescript-eslint'
import tsparser from '@typescript-eslint/parser'
import stylistic from '@stylistic/eslint-plugin'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      ...stylistic.configs.recommended.rules,
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/arrow-parent': ['error', 'always'],
      '@stylistic/curly-newline': ['error', 'consistent'],
      '@stylistic/function-call-argument-newline': ["error", "consistent"],
      '@stylistic/jsx-closing-bracket-location': [1, 'tag-aligned']
    },
  },
]
