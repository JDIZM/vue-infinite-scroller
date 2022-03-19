module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/recommended", // Use this if you are using Vue.js 2.x.
    "eslint:recommended",
    "@vue/prettier",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    parser: "babel-eslint",
  },
  rules: {
    "vue/no-unused-vars": "error",
  },
};
