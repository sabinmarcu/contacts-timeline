/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { orange, purple } from '@material-ui/core/colors';
import Navigation from './index';

storiesOf('Layout', module)
  .add('Barebones', () => <Navigation />)
  .add('Styled', () => (
    <ThemeProvider theme={createMuiTheme({
      palette: {
        primary: { main: purple[500] },
        secondary: { main: orange[500] },
      },
    })}
    >
      <Navigation />
    </ThemeProvider>
  ));
