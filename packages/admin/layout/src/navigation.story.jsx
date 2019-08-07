// @flow

/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryThemeShowcase } from '@ct/themes';
import { Layout } from '@ct/storybook';

import {
  Navigation,
  ThemeSwitcher,
  ThemeProvider,
  useThemeProvider,
} from './index';

const DemoWrapper = ({ children }: { children: any }) => {
  const context = useThemeProvider();
  return <ThemeProvider value={context}>{children}</ThemeProvider>;
};

storiesOf('Layout/Navigation', module)
  .add('Showcase', () => (
    <Layout>
      <StoryThemeShowcase variant="vertical">
        <Navigation />
      </StoryThemeShowcase>
    </Layout>
  ))
  .add('Full Demo', () => (
    <Layout>
      <DemoWrapper>
        <Navigation right={<ThemeSwitcher />} />
      </DemoWrapper>
    </Layout>
  ));
