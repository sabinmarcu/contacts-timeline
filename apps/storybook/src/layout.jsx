// @flow

import React, {
  type Node,
  createContext,
  useState,
  useCallback,
} from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  padding: {
    padding: '15px 10px',
  },
}));

export const LayoutTransparencyContext = createContext<boolean>(false);
export const LayoutTransparency = ({ children }: { children: Node }): Node => {
  const [isTransparent, setIsTransparent] = useState(false);
  const handler = useCallback(
    ({ target: { checked } }) => setIsTransparent(checked),
    [setIsTransparent],
  );
  const styles = useStyles();
  return (
    <LayoutTransparencyContext.Provider value={isTransparent}>
      <Paper className={styles.padding}>
        <Typography variant="h6">
          Background Transparency
        </Typography>
        <FormControlLabel
          control={
            <Switch checked={isTransparent} onChange={handler} />
          }
          label={isTransparent ? 'transparent' : 'solid'}
        />
      </Paper>
      {children}
    </LayoutTransparencyContext.Provider>
  );
};

export const Layout = ({ children }: { children: Node }): Node => (
  <ThemeProvider theme={createMuiTheme({})}>
    {children}
  </ThemeProvider>
);

export default Layout;
