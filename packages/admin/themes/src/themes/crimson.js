// @flow

import { createMuiTheme } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';
import { type ThemeFormat } from './types';

const Theme: ThemeFormat = {
  name: 'Crimson',
  theme: createMuiTheme({
    palette: {
      primary: { main: red[500] },
      secondary: { main: purple[900] },
    },
  }),
};

export default Theme;
