/* eslint-disable no-param-reassign,import/no-extraneous-dependencies */

const { resolve } = require('path');
const {
  tweakBabelLoaders,
  getBabelLoaderOptions,
  addBabelPreset,
} = require('./utils');

module.exports = (config, { DEV }) => {
  tweakBabelLoaders(config, (babelLoader) => {
    const babelLoaderVariables = getBabelLoaderOptions(babelLoader);
    addBabelPreset(babelLoaderVariables, '@babel/env');
    addBabelPreset(babelLoaderVariables, '@babel/flow');
    if (!DEV && babelLoaderVariables.options) {
      delete babelLoaderVariables.options.cacheDirectory;
      delete babelLoaderVariables.options.cacheCompression;
      delete babelLoaderVariables.options.cacheIdentifier;
    }
    if (babelLoader.include) {
      babelLoader.include = [
        ...(babelLoader.include.substr ? [babelLoader.include] : babelLoader.include),
        resolve(__dirname, '../../../../apps'),
        resolve(__dirname, '../../../../packages'),
        /\.jsx$/g,
      ];
    }
    babelLoader.use = [
      babelLoaderVariables,
    ];
    delete babelLoader.loader;
    delete babelLoader.options;
  });
};
