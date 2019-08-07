// @flow

/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Layout } from '@ct/storybook';

import {
  Button,
} from '@material-ui/core';

import {
  ThemeSwitcher,
  ThemeProvider,
  useThemeProvider,
} from './index';

const DemoWrapper = ({ children }: {children: any}) => {
  const context = useThemeProvider();
  return <ThemeProvider value={context}>{children}</ThemeProvider>;
};

storiesOf('Layout/Theme Switcher', module)
  .add('Demo', () => (
    <Layout>
      <DemoWrapper>
        <ThemeSwitcher color="hint" />
        <br />
        <Button color="primary" variant="contained">Thing</Button>
        <Button color="primary" variant="outlined">Thing</Button>
        <Button color="primary" variant="text">Thing</Button>
        <br />
        <Button color="secondary" variant="contained">Thing</Button>
        <Button color="secondary" variant="outlined">Thing</Button>
        <Button color="secondary" variant="text">Thing</Button>
      </DemoWrapper>
    </Layout>
  ));
