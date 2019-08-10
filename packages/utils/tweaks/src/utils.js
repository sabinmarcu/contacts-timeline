/* eslint-disable no-param-reassign */
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
  mutators.forEach(mutator => mutator && mutator(config, extraOptions));
};

const getReplacePlugin = config => config.plugins.find(({ replacements }) => !!replacements);

const getDefinitionsPlugin = config => config.plugins.find(({ definitions }) => !!definitions);


const setProcValue = (config, mappings) => {
  const replacePlugin = getReplacePlugin(config);
  if (replacePlugin) {
    replacePlugin.replacements = {
      ...replacePlugin.replacements,
      ...mappings,
    };
  }
  const definitionsPlugin = getDefinitionsPlugin(config);
  if (definitionsPlugin) {
    definitionsPlugin.definitions['process.env'] = {
      ...definitionsPlugin.definitions['process.env'],
      ...Object.keys(mappings)
        .reduce((prev, key) => ({ ...prev, [key]: JSON.stringify(mappings[key]) }), {}),
    };
  }
  process.env = {
    ...process.env,
    ...mappings,
  };
};

const addBabelPlugin = (babelLoaderVariables, plugin) => {
  if (!babelLoaderVariables.options.plugins) {
    return;
  }
  babelLoaderVariables.options.plugins = [
    ...babelLoaderVariables.options.plugins,
    plugin,
  ];
};

const addBabelPreset = (babelLoaderVariables, preset) => {
  if (!babelLoaderVariables.options.presets) {
    return;
  }
  babelLoaderVariables.options.presets = [
    ...babelLoaderVariables.options.presets,
    preset,
  ];
};

module.exports = {
  getRules,
  getBabelLoaders,
  getCssLoaders,
  tweakBabelLoaders,
  tweakCssLoaders,
  getBabelLoaderOptions,
  getReplacePlugin,
  setProcValue,
  addBabelPlugin,
  addBabelPreset,
  compose,
};
