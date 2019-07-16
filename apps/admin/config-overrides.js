/* eslint-disable import/no-extraneous-dependencies,no-param-reassign */

const {
  override,
  overrideDevServer,
  watchAll,
  addBabelPreset,
} = require('customize-cra');

const {
  tweakWebConfig,
} = require('@ct/tweaks');

module.exports = {
  webpack: override(
    addBabelPreset('@babel/flow'),
    addBabelPreset('linaria/babel'),
    tweakWebConfig,
  ),
  devServer: overrideDevServer(
    watchAll(),
  ),
};
