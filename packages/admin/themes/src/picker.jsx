// @flow
/* eslint-disable no-underscore-dangle */

import React, {
  useState,
  useMemo,
  useCallback,
  type Node as ReactNode,
} from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  ThemeProvider,
} from '@material-ui/styles';
import { type ThemeFormat } from './themes/types';

const ThemePicker = ({
  themes = {},
  children,
}: {
  themes: { [key: string]: ThemeFormat },
  children: any,
}) => {
  const themeKeys = useMemo(
    () => Object.keys(themes),
    [themes],
  );
  const [activeTheme, setActiveTheme] = useState(themes.default.theme);
  const onChange = useCallback(
    ({ target: { value } }) => setActiveTheme(value),
    [activeTheme],
  );
  return (
    <ThemeProvider theme={activeTheme}>
      <FormControl fullWidth>
        <InputLabel htmlFor="theme-select">Theme</InputLabel>
        <Select
          value={activeTheme}
          onChange={onChange}
          inputProps={{
            id: 'theme-select',
          }}
        >
          {themeKeys.map((theme: string): ReactNode => (
            <MenuItem key={theme} value={themes[theme].theme}>{themes[theme].name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {children}
    </ThemeProvider>
  );
};

export default ThemePicker;
