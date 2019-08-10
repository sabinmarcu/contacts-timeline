/* eslint-disable no-param-reassign */


module.exports = (config) => {
  if (process.env.REACT_APP_STYLER !== 'linaria') {
    config.resolve.alias = {
      ...config.resolve.alias,
      'linaria/react': '@ct/shims/src/index.js',
      linaria: '@ct/shims/src/index.js',
    };
  }
};
