// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { makeContact } from '@ct/generators/src/entities';
import { StoryThemeShowcase, StoryThemePicker } from '@ct/themes';
import { Layout } from '@ct/storybook';
import { Editor } from './editor';
import { Preview } from './preview';

const PreviewItem = () => (
  <Editor
    onUpdate={action('Update')}
    contact={makeContact()}
  />
);

const Showcase = () => (
  <StoryThemeShowcase variant="horizontal">
    <PreviewItem />
  </StoryThemeShowcase>
);

const SideBySide = () => {
  const [state, setState] = useState(makeContact());
  return (
    <StoryThemePicker>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: 10 }}>
        <Editor
          onUpdate={setState}
          contact={state}
        />
        <Preview contact={state} />
      </div>
    </StoryThemePicker>
  );
};

storiesOf('Contact Editor', module)
  .add('Showcase', () => (
    <Layout>
      <Showcase />
    </Layout>
  )).add('Demo', () => (
    <Layout>
      <SideBySide />
    </Layout>
  ));
