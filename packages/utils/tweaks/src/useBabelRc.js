/* eslint-disable no-param-reassign,import/no-dynamic-require */

const { resolve } = require('path');
const {
  tweakBabelLoaders,
  getBabelLoaderOptions,
} = require('./utils');

const BabelConfig = require(resolve(__dirname, '../../../../.babelrc'));

module.exports = (config, { isStorybook = false }) => {
  if (isStorybook) {
    return;
  }
  tweakBabelLoaders(config, (babelLoader) => {
    const babelLoaderVariables = getBabelLoaderOptions(babelLoader);

    Object.keys(BabelConfig)
      .forEach((key) => {
        if (babelLoaderVariables.options[key]) {
          babelLoaderVariables.options[key] = [
            ...babelLoaderVariables.options[key],
            ...BabelConfig[key],
          ].filter((it, index, array) => array.indexOf(it) === index);
        }
      });
  });
};
