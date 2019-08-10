/* eslint-disable no-param-reassign */

const {
  tweakBabelLoaders,
  getBabelLoaderOptions,
  addBabelPlugin,
  setProcValue,
} = require('./utils');

module.exports = (config, { DEV }) => {
  tweakBabelLoaders(config, (babelLoader) => {
    const babelLoaderVariables = getBabelLoaderOptions(babelLoader);
    addBabelPlugin(
      babelLoaderVariables,
      ['babel-plugin-emotion', {
        displayName: true,
        sourceMap: DEV,
        autoLabel: DEV,
        labelFormat: '[dirname]_[filename]-[local]',
      }],
    );
  });
  setProcValue(config, { REACT_REACT_APP_STYLER: 'emotion' });
};
