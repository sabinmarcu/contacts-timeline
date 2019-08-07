/* eslint-disable no-param-reassign */

const { getRules } = require('./utils');

module.exports = (config) => {
  const rules = getRules(config);
  config.resolve.extensions.push(
    '.graphql',
    '.gql',
  );
  rules.unshift({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader',
  });
};
