const { tweakWebConfig } = require('@ct/tweaks');

module.exports = async ({ config }) => tweakWebConfig(config, null, true);
