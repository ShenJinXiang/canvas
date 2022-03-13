module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-shadow": ["error", { "builtinGlobals": false, "hoist": "functions", "allow": [] }],
    'linebreak-style': [0, 'error', 'windows'],
    'max-len' : ["error", {code : 300}],
  },
};
