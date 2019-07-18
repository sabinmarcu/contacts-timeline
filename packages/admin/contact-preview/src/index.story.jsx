/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { StoryThemePicker } from '@ct/themes';
import Navigation from './index';

storiesOf('Contact Preview', module)
  .add('Barebones', () => <Navigation />)
  .add('Styled', () => (
    <StoryThemePicker>
      <Navigation />
    </StoryThemePicker>
  ));
