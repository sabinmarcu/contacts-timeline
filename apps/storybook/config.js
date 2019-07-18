import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const reqApps = require.context('../', true, /\.story\.jsx?$/);
const reqPackages = require.context('../../packages', true, /\.story\.jsx?$/);
function loadStories() {
  reqApps.keys().forEach(filename => reqApps(filename));
  reqPackages.keys().forEach(filename => reqPackages(filename));
}

configure(loadStories, module);
