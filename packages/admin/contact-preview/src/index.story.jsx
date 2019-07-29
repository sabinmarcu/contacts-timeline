// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { makeContact } from '@ct/generators/src/entities';
import { StoryThemeShowcase, StoryThemePicker } from '@ct/themes';
import { Layout, Section } from '@ct/storybook';
import Preview from './index';

const PreviewItem = () => (
  <Preview
    contact={makeContact()}
    onEdit={action('Edit Clicked')}
    onRemove={action('Remove Clicked')}
  />
);

const Showcase = () => (
  <StoryThemeShowcase variant="horizontal">
    <PreviewItem />
  </StoryThemeShowcase>
);

storiesOf('Contact Preview', module)
  .add('Showcase', () => (
    <Layout>
      <Showcase />
    </Layout>
  ))
  .add('Layouting', () => (
    <Layout>
      <StoryThemePicker>
        <>
          <Section title="Flex Row">
            <PreviewItem />
          </Section>
          <Section title="Grid 2 Columns" variant="col2">
            <PreviewItem />
            <PreviewItem />
            <PreviewItem />
            <PreviewItem />
            <PreviewItem />
            <PreviewItem />
          </Section>
          <Section title="Grid 3 Columns" variant="col3">
            <PreviewItem />
            <PreviewItem />
            <PreviewItem />
            <PreviewItem />
            <PreviewItem />
            <PreviewItem />
          </Section>
        </>
      </StoryThemePicker>
    </Layout>
  ));
