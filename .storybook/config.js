import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const reqApps = require.context('../apps', true, /\.story\.jsx?$/);
const reqPackages = require.context('../packages', true, /\.story\.jsx?$/);
function loadStories() {
  console.log("LOADING", [...reqApps.keys(), ...reqPackages.keys()]);
  reqApps.keys().forEach(filename => reqApps(filename));
  reqPackages.keys().forEach(filename => reqPackages(filename));
}

configure(loadStories, module);
