import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';

const overrides = {
  files: [
      "packages/*/src/**/*.{ts,vue}",
  ],
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      warnOnUnsupportedTypeScriptVersion: false,
      extraFileExtensions: ['.vue'],
      tsconfigRootDir: import.meta.dirname,
      projectService: {
        defaultProject: './tsconfig.eslint.json'
      }
    }
  },
  plugins: {
    vue: vuePlugin,
    "@typescript-eslint": tseslint.plugin,
  },
  settings: {
    "import/parsers": {"@typescript-eslint/parser": [".ts"]},
    "import/resolver": {
      "typescript": {"alwaysTryTypes": true},
    }
  }};

export default [
  ...vuePlugin.configs['flat/recommended'].map(config => ({...config, ...overrides})),
  ...tseslint.configs.recommended.map(config => ({...config, ...overrides})),
  ...tseslint.configs.recommendedTypeChecked.map(config => ({...config, ...overrides})),
  ...tseslint.configs.stylisticTypeChecked.map(config => ({...config, ...overrides}))
]
