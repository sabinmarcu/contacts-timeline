// @flow

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useDebugValue,
  createContext,
  useContext,
  type Element,
} from 'react';
import {
  themes,
  type ThemeFormat,
  type ThemeNamesType,
} from '@ct/themes';

import {
  styled,
} from 'linaria/react';

import {
  ThemeProvider as MUIThemeProvider,
} from '@material-ui/styles';
import {
  IconButton,
  Tooltip,
  MenuItem,
  Menu,
  withTheme,
} from '@material-ui/core';
import {
  ColorLens as ThemeIcon,
} from '@material-ui/icons';

export type ThemeContextType = {
  setTheme: ThemeNamesType => void,
  theme: ThemeFormat,
  themeId: ThemeNamesType,
  themeName: string,
}

export const ThemeContext = createContext<ThemeContextType>({});
export const ThemeProvider = ({
  children,
  value,
}: {
  children: Element<*>,
  value: ThemeContextType,
}) => (
  <ThemeContext.Provider value={value}>
    <MUIThemeProvider theme={value.theme}>
      {children}
    </MUIThemeProvider>
  </ThemeContext.Provider>
);

export const themeLocalstorageKey = 'app:theme';
export const useThemeProvider = (
  defaultTheme: ThemeNamesType = 'default',
) => {
  const [activeTheme, setActiveTheme] = useState<ThemeNamesType>(
    // $FlowFixMe
    localStorage.getItem(themeLocalstorageKey) || defaultTheme,
  );
  const theme: ThemeFormat = useMemo(
    () => themes[activeTheme].theme,
    [activeTheme],
  );
  const themeName: string = useMemo(
    () => themes[activeTheme].name,
    [activeTheme],
  );
  useEffect(
    () => localStorage.setItem(themeLocalstorageKey, activeTheme),
    [activeTheme],
  );
  useDebugValue(`Active: ${activeTheme}`);
  return {
    setTheme: setActiveTheme,
    theme,
    themeName,
    themeId: activeTheme,
  };
};

const StyledIconButton = withTheme(styled(IconButton)`
  color: ${({
    color,
    theme:
    {
      palette:
      {
        text,
        primary: { contrastText },
      },
    },
  }) => (color && text[color]) || contrastText} !important;
`);

const themeKeys = Object.keys(themes);
export const ThemeSwitcher = ({
  color,
}: { color: 'primary' | 'secondary' | 'disabled' | 'hint'}) => {
  const {
    themeId, setTheme, themeName,
  } = useContext(ThemeContext);
  const [anchor, setAnchor] = useState(null);
  const open = useMemo(
    () => !!anchor,
    [anchor],
  );
  const onOpen = useCallback(
    ({ currentTarget }) => setAnchor(currentTarget),
    [setAnchor],
  );
  const onClose = useCallback(
    () => setAnchor(null),
    [setAnchor],
  );
  const onSave = useCallback(
    ({ target: { id } }) => {
      setTheme(id);
      onClose();
    },
    [onClose, setTheme],
  );
  return (
    <>
      <Tooltip title={`Active: ${themeName}`}>
        <StyledIconButton color={color} onClick={onOpen}>
          <ThemeIcon />
        </StyledIconButton>
      </Tooltip>
      <Menu
        onClose={onClose}
        anchorEl={anchor}
        open={open}
      >
        {themeKeys.map((key: string): Element<*> => (
          <MenuItem
            key={key}
            id={key}
            selected={key === themeId}
            onClick={onSave}
          >
            {themes[key].name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ThemeSwitcher;
