/* eslint-disable import/no-extraneous-dependencies,no-param-reassign */

const {
  override,
  overrideDevServer,
  watchAll,
  addBabelPreset,
} = require('customize-cra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEV = process.env.NODE_ENV !== 'production';
module.exports = {
  webpack: override(
    addBabelPreset('@babel/flow'),
    addBabelPreset('linaria/babel'),
    (config) => {
      const rules = config.module.rules.find(({ oneOf }) => !!oneOf).oneOf;
      const babelLoader = rules.filter(({ test }) => `${test}`.includes('js'))[0];
      // delete babelLoader.options.plugins;
      // delete babelLoader.options.presets;
      babelLoader.use = [
        {
          loader: babelLoader.loader,
          options: babelLoader.options,
        },
        {
          loader: 'linaria/loader',
          options: {
            sourceMap: DEV,
            cacheDirectory: 'src/.linaria_cache',
            babelOptions: {
              presets: babelLoader.options.presets,
            },
          },
        },
      ];
      delete babelLoader.loader;
      delete babelLoader.options;
      const cssLoaders = rules.filter(({ test }) => `${test}`.match(/[^s]css/));
      cssLoaders.forEach(({ use }) => {
        const cssLoaderIndex = use.findIndex(({ loader }) => loader && loader.includes('css-loader'));
        use[cssLoaderIndex].options.sourceMap = DEV;
        use.splice(cssLoaderIndex, 0, {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: DEV,
          },
        });
      });
      config.plugins.push(new MiniCssExtractPlugin({
        filename: 'styles.css',
      }));
      return config;
    },
  ),
  devServer: overrideDevServer(
    watchAll(),
  ),
};
