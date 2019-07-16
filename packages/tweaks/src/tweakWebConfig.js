/* eslint-disable import/no-extraneous-dependencies,no-param-reassign */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEV = process.env.NODE_ENV !== 'production';

module.exports = (config) => {
  const rulesParent = config.module.rules.find(({ oneOf }) => !!oneOf);
  const rules = rulesParent ? rulesParent.oneOf : config.module.rules;
  const babelLoader = rules.filter(({ test }) => `${test}`.includes('js'))[0];
  const babelLoaderVariables = babelLoader.loader && babelLoader.options
    ? {
      loader: babelLoader.loader,
      options: babelLoader.options,
    } : {
      loader: babelLoader.use[0].loader,
      options: babelLoader.use[0].options,
    };
  babelLoader.use = [
    babelLoaderVariables,
    {
      loader: 'linaria/loader',
      options: {
        sourceMap: DEV,
        cacheDirectory: 'src/.linaria_cache',
        babelOptions: {
          presets: babelLoaderVariables.options.presets,
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
};
