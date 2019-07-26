// @flow

import React from 'react';
import themesImport from './themes';
import picker from './picker';
import showcase, { type Props as ShowcaseProps } from './showcase';

import type { ThemeFormat as ThemeType } from './themes/types';

export type { ThemeType as ThemeFormat };

export const ThemePicker = picker;
export const Showcase = showcase;
export const themes = themesImport;

export const StoryThemePicker = (props: Object) => (
  <ThemePicker themes={themes} {...props} />
);

export const StoryThemeShowcase = (
  props: $Diff<ShowcaseProps, { themes: { [key: string]: ThemeType } }>,
) => (
  <Showcase themes={themes} {...props} />
);

export default StoryThemePicker;
