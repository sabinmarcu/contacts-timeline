/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  tweakBabelLoaders,
  tweakCssLoaders,
  getBabelLoaderOptions,
  setProcValue,
  addBabelPreset,
} = require('./utils');

module.exports = (config, { DEV }) => {
  tweakBabelLoaders(config, (babelLoader) => {
    const babelLoaderVariables = getBabelLoaderOptions(babelLoader);
    addBabelPreset(babelLoaderVariables, 'linaria/babel');

    delete babelLoaderVariables.options.cacheIdentifier;
    const linariaLoader = {
      loader: 'linaria/loader',
      options: {
        sourceMap: DEV,
        cacheDirectory: 'src/.linaria_cache',
        displayName: true,
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
      ...babelLoader.use,
      linariaLoader,
    ];
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

  setProcValue(config, { REACT_APP_STYLER: 'linaria' });
};
