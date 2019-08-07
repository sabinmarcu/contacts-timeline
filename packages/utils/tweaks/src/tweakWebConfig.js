/* eslint-disable  */

const { resolve } = require('path');

const { compose } = require('./utils');

const useBabelRc = require('./useBabelRc');
const useGraphQL = require('./useGraphQL');
const useLinaria = require('./useLinaria');
const useHotModule = require('./useHotModule');

module.exports = (config, isStorybook = false) => {
  console.log('ENV: ', process.env.NODE_ENV);
  console.log(
    'REACT VARS: ',
    ...Object.keys(process.env)
      .filter(key => /^REACT_APP/.test(key))
      .map(key => `\n\tKey: '${key}'\n\tValue: '${process.env[key]}'\n`),
  );

  compose(
    config,
    [
      useBabelRc,
      useGraphQL,
      useLinaria,
      useHotModule,
    ],
    { isStorybook }
  )

  return config;
};
