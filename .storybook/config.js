import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const reqApps = require.context('../apps', true, /\.story\.js$/);
const reqPackages = require.context('../packages', true, /\.story\.js$/);
function loadStories() {
  reqApps.keys().forEach(filename => reqApps(filename));
  reqPackages.keys().forEach(filename => reqPackages(filename));
}

configure(loadStories, module);
