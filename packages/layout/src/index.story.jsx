import React from 'react';
import { storiesOf } from '@storybook/react';

import Navigation from './index';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { orange, purple } from '@material-ui/core/colors';

storiesOf('Layout', module)
  .add('Barebones', () => <Navigation />)
  .add("Styled", () => <ThemeProvider theme={createMuiTheme({
    palette: {
      primary: { main: purple[500] },
      secondary: { main: orange[500] },
    },
  })}><Navigation /></ThemeProvider>);