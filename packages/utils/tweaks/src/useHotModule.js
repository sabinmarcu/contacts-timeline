/* eslint-disable no-param-reassign,import/no-dynamic-require */

const {
  tweakBabelLoaders,
  getBabelLoaderOptions,
} = require('./utils');

module.exports = (config) => {
  tweakBabelLoaders(config, (babelLoader) => {
    const babelLoaderVariables = getBabelLoaderOptions(babelLoader);

    if (babelLoaderVariables.options.plugins) {
      babelLoaderVariables.options.plugins.push('react-hot-loader/babel');
    }
  });
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-dom': '@hot-loader/react-dom',
  };
};
