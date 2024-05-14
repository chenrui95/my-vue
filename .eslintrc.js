// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  extends: [
    // 'eslint:recommended',
    // 'plugin:prettier/recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    semi: ['error', 'always'],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-escape': 'off',
    'array-callback-return': 'error',
    'class-methods-use-this': 'off',
    'default-case': 'off',
    eqeqeq: 'error',
    'guard-for-in': 'error',
    'no-alert': 'error',
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-extend-native': 'error',
    'no-var': 'error',
    'no-console': 'off',
    'no-empty': 'error',
    'no-unused-vars': 'off',
    'no-multiple-empty-lines': 'error',
    'no-unreachable': 'error',
    'no-param-reassign': 'error',
    'no-duplicate-imports': 'error',
    'no-undef': 'off',
    'max-len': [
      'error',
      {
        code: 150
      }
    ],
    'space-before-function-paren': 0
  }
}
