// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  "env": {
    "commonjs": true,
  },
  parserOptions: {
    ecmaVersion: 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  // add your custom rules here
  rules: {
    "no-throw-literal": 0,
    // 'space-before-function-paren': ['error', 'never'],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['error', 'always']
  }
}
