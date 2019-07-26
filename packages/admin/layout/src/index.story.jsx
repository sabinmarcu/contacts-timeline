// @flow

/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryThemeShowcase } from '@ct/themes';
import { Layout } from '@ct/storybook';

import { Navigation } from './index';

storiesOf('Layout', module)
  .add('Navigation', () => (
    <Layout>
      <StoryThemeShowcase variant="vertical">
        <Navigation />
      </StoryThemeShowcase>
    </Layout>
  ));
