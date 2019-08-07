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
export const themeNames: string[] = 
  Object.keys(themesImport);

export type ThemeNamesType = $Keys<typeof themesImport>;

export const StoryThemePicker = ({ children, ...rest }: Object) => (
  <ThemePicker themes={themes} {...rest}>{children}</ThemePicker>
);

export const StoryThemeShowcase = (
  { children, ...rest }: $Diff<ShowcaseProps, { themes: { [key: string]: ThemeType } }>,
) => (
  <Showcase themes={themes} {...rest}>{children}</Showcase>
);

export default StoryThemePicker;
