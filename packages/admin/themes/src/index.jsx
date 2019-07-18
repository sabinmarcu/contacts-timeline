// @flow

import React from 'react';
import themesImport from './themes';
import picker from './picker';

export type { ThemeFormat } from './themes/types';

export const ThemePicker = picker;
export const themes = themesImport;

export const StoryThemePicker = (props: Object) => (
  <ThemePicker themes={themes} {...props} />
);

export default StoryThemePicker;
