/* eslint-disable no-param-reassign,import/no-extraneous-dependencies */

const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  tweakBabelLoaders,
  tweakCssLoaders,
  getBabelLoaderOptions,
} = require('./utils');

const DEV = process.env.NODE_ENV !== 'production';

module.exports = (config) => {
  tweakBabelLoaders(config, (babelLoader) => {
    const babelLoaderVariables = getBabelLoaderOptions(babelLoader);
    if (!DEV && babelLoaderVariables.options) {
      delete babelLoaderVariables.options.cacheDirectory;
      delete babelLoaderVariables.options.cacheCompression;
      delete babelLoaderVariables.options.cacheIdentifier;
    }
    const linariaLoader = {
      loader: 'linaria/loader',
      options: {
        sourceMap: DEV,
        cacheDirectory: 'src/.linaria_cache',
        babelOptions: {
          ...babelLoaderVariables.options,
        },
      },
    };
    delete linariaLoader.options.babelOptions.cacheDirectory;
    delete linariaLoader.options.babelOptions.cacheCompression;
    delete linariaLoader.options.babelOptions.cacheIdentifier;
    delete linariaLoader.options.babelOptions.customize;
    babelLoader.use = [
      babelLoaderVariables,
      linariaLoader,
    ];
    delete babelLoader.loader;
    delete babelLoader.options;
    if (babelLoader.include) {
      babelLoader.include = [
        ...(babelLoader.include.substr ? [babelLoader.include] : babelLoader.include),
        resolve(__dirname, '../../../../apps'),
        resolve(__dirname, '../../../../packages'),
        /\.jsx$/g,
      ];
    }
  });

  tweakCssLoaders(config, ({ use }) => {
    use.forEach((loader) => {
      if (loader.options && loader.options.sourceMap) {
        loader.options.sourceMap = DEV;
      }
    });
    const miniCssLoader = use.find(({ loader }) => loader && loader.includes('mini-css-extract-plugin'));
    if (!miniCssLoader) {
      const cssLoaderIndex = use.findIndex(({ loader }) => loader && loader.includes('css-loader'));
      use.splice(cssLoaderIndex, 0, {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: DEV,
        },
      });
    }
  });

  config.plugins.push(new MiniCssExtractPlugin({
    filename: 'styles.css',
  }));
};
