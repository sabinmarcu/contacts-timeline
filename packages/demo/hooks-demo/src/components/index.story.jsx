// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StoryThemePicker, StoryThemeShowcase } from '@ct/themes';
import { Layout } from '@ct/storybook';

import { Counter } from './counter';
import { Todos } from './todo';

storiesOf('Demo/Hooks')
  .add("Counter", () => (
    <Layout>
      <StoryThemeShowcase variant="vertical">
        <Counter />
      </StoryThemeShowcase>
    </Layout>
  ))
  .add("Todos", () => (
    <Layout>
      <StoryThemePicker>
        <Todos />
      </StoryThemePicker>
    </Layout>
  ));