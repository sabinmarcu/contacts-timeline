const { tweakWebConfig } = require('../packages/tweaks/src');

module.exports = async ({ config }) => tweakWebConfig(config);