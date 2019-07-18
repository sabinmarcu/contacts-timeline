// @flow

import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, orange } from '@material-ui/core/colors';
import { type ThemeFormat } from './types';

const Theme: ThemeFormat = {
  name: 'Royal',
  theme: createMuiTheme({
    palette: {
      primary: { main: deepPurple[500] },
      secondary: { main: orange[900] },
    },
  }),
};

export default Theme;
