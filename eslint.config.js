import globals from 'globals'
import tseslint from 'typescript-eslint'
import tsparser from '@typescript-eslint/parser'
import stylistic from '@stylistic/eslint-plugin'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'

console.log(pluginReactHooks.configs['recommended-latest'].rules)
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs.recommended,
  {
    languageOptions: {
      parser: tsparser,
      globals: {
        ...globals.browser,
        ...globals.es2025,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    files: ['**/frontend/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react': pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReactHooks.configs['recommended-latest'].rules,
    },
  },
]
