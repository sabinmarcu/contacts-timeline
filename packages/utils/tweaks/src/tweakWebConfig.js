/* eslint-disable import/no-extraneous-dependencies,no-param-reassign */

const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BabelConfig = require(resolve(__dirname, '../../../../.babelrc'));

const DEV = process.env.NODE_ENV !== 'production';

module.exports = (config, isStorybook = false) => {
  config.resolve.extensions.push(
    '.graphql',
    '.gql',
  );
  const rulesParent = config.module.rules.find(({ oneOf }) => !!oneOf);
  const rules = rulesParent ? rulesParent.oneOf : config.module.rules;
  const babelLoaders = rules.filter(({ test }) => `${test}`.includes('js'));
  babelLoaders.forEach((babelLoader) => {
    console.log('ENV: ', process.env.NODE_ENV);
    console.log(
      'REACT VARS: ',
      ...Object.keys(process.env)
        .filter(key => /^REACT_APP/.test(key))
        .map(key => `\n\tKey: '${key}'\n\tValue: '${process.env[key]}'\n`),
    );
    const babelLoaderVariables = babelLoader.loader && babelLoader.options
      ? {
        loader: babelLoader.loader,
        options: babelLoader.options,
      } : {
        loader: babelLoader.use[0].loader,
        options: babelLoader.use[0].options,
      };
    if (!DEV && babelLoaderVariables.options) {
      delete babelLoaderVariables.options.cacheDirectory;
      delete babelLoaderVariables.options.cacheCompression;
      delete babelLoaderVariables.options.cacheIdentifier;
    }
    if (!isStorybook) {
      Object.keys(BabelConfig)
        .forEach((key) => {
          if (babelLoaderVariables.options[key]) {
            babelLoaderVariables.options[key] = [
              ...babelLoaderVariables.options[key],
              ...BabelConfig[key],
            ].filter((it, index, array) => array.indexOf(it) === index);
          }
        });
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
  const cssLoaders = rules.filter(({ test }) => `${test}`.match(/[^s]css/));
  cssLoaders.forEach(({ use }) => {
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
  rules.unshift({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader',
  });
  config.plugins.push(new MiniCssExtractPlugin({
    filename: 'styles.css',
  }));
  return config;
};
