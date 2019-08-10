// @flow

import { css as emotionCSs } from 'emotion';
import emotionStyler from '@emotion/styled';

const stylersMap = {
  emotion: emotionStyler,
};

const cssMap = {
  emotion: emotionCSs,
};

// $FlowFixMe
export const styled = stylersMap[process.env.REACT_APP_STYLER] || emotionStyler;
// $FlowFixMe
export const css = cssMap[process.env.REACT_APP_STYLER] || emotionCSs;
