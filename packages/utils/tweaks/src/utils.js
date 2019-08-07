/* eslint-disable no-underscore-dangle */

let _rules = null;
const getRules = (config) => {
  if (!_rules) {
    const rulesParent = config.module.rules.find(({ oneOf }) => !!oneOf);
    _rules = rulesParent ? rulesParent.oneOf : config.module.rules;
  }
  return _rules;
};

let _babelLoaders = null;
const getBabelLoaders = (config) => {
  if (!_babelLoaders) {
    const rules = getRules(config);
    _babelLoaders = rules.filter(({ test }) => `${test}`.includes('js'));
  }
  return _babelLoaders;
};

let _cssLoaders = null;
const getCssLoaders = (config) => {
  if (!_cssLoaders) {
    const rules = getRules(config);
    _cssLoaders = rules.filter(({ test }) => `${test}`.match(/[^s]css/));
  }
  return _cssLoaders;
};

const tweakBabelLoaders = (config, mutator) => {
  const babelLoaders = getBabelLoaders(config);
  babelLoaders.forEach(mutator);
};

const tweakCssLoaders = (config, mutator) => {
  const cssLoaders = getCssLoaders(config);
  cssLoaders.forEach(mutator);
};

const getBabelLoaderOptions = babelLoader => (babelLoader.loader && babelLoader.options
  ? {
    loader: babelLoader.loader,
    options: babelLoader.options,
  } : {
    loader: babelLoader.use[0].loader,
    options: babelLoader.use[0].options,
  });

const compose = (config, mutators, extraOptions) => {
  mutators.forEach((mutator, index) => console.log('Running', index) || mutator(config, extraOptions));
};

module.exports = {
  getRules,
  getBabelLoaders,
  getCssLoaders,
  tweakBabelLoaders,
  tweakCssLoaders,
  getBabelLoaderOptions,
  compose,
};
