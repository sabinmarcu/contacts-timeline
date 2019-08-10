/* eslint-disable  */

const { resolve } = require('path');

const { compose, getReplacePlugin } = require('./utils');

const useBabelRc = require('./useBabelRc');
const useBabelLoader = require('./useBabelLoader');
const useGraphQL = require('./useGraphQL');
const useLinaria = require('./useLinaria');
const useHotModule = require('./useHotModule');
const useEmotion = require('./useEmotion');
const useReplaceLinariaImports = require('./useReplaceLinariaImports');

const DEV = process.env.NODE_ENV !== 'production';

module.exports = (config, env, isStorybook = false) => {
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
      useBabelLoader,
      useBabelRc,
      DEV 
          ? useEmotion 
          : useLinaria,
      useReplaceLinariaImports,
      useGraphQL,
      useHotModule,
    ],
    { 
      isStorybook, 
      DEV,
    }
  );

  return config;
};
