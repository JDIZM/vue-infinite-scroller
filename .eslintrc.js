module.exports = {
  root: true,
  env: {
    node: true
  },
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
    //   'plugin:vue/vue3-recommended',
      'plugin:vue/recommended', // Use this if you are using Vue.js 2.x.
    // 'plugin:vue/essential',
    'eslint:recommended'
    ],
    parserOptions: {
      parser: 'babel-eslint'
    },
    rules: {
      // 'eqeqeq': 'error, always',
      // override/add rules settings here, such as:
      'vue/no-unused-vars': 'error'
      // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  }
  