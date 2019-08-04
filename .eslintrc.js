const path = require('path');

module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "plugin:flowtype/recommended",
  ],
  plugins: ["flowtype"],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-lerna': {
        packages: [
          path.resolve(__dirname, 'packages'),
          path.resolve(__dirname, 'apps'),
        ],
      },
    },
  },
  rules: {
    'react/prop-types': 0,
    'react/require-default-props': [0]
  },
};
