// @flow

import { createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { type ThemeFormat } from './types';

const Theme: ThemeFormat = {
  name: 'Sky',
  theme: createMuiTheme({
    palette: {
      primary: { main: blue[500] },
      secondary: { main: red[500] },
    },
  }),
};

export default Theme;
