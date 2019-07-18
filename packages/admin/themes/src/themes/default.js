// @flow

import { createMuiTheme } from '@material-ui/core/styles';
import { type ThemeFormat } from './types';

const Theme: ThemeFormat = {
  name: 'Default',
  theme: createMuiTheme({}),
};

export default Theme;
