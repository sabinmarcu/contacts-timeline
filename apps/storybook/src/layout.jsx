// @flow

import React, { type Node } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

export const Layout = ({ children }: { children: Node }): Node => (
  <ThemeProvider theme={createMuiTheme({})}>
    {children}
  </ThemeProvider>
);

export default Layout;
