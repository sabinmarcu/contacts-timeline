// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React, {
  useState, useCallback, useRef, useMemo,
} from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { makeContact } from '@ct/generators/src/entities';
import { StoryThemeShowcase, StoryThemePicker } from '@ct/themes';
import { Layout } from '@ct/storybook';
import { Flippable, FlipContext, useFlippableProvider } from '@ct/ui';
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

const ToggleEditor = () => {
  const [state, setState] = useState(makeContact());
  const [inputState, setInputState] = useState(state);
  const [editing, setEditing] = useState(false);
  const toggleEditing = useCallback(
    () => { setEditing(value => !value); },
    [setEditing],
  );
  const saveState = useCallback(
    () => {
      setState(inputState);
      toggleEditing();
    },
    [inputState, setState, toggleEditing],
  );
  const cancelEditing = useCallback(
    () => {
      setInputState(state);
      toggleEditing();
    },
    [state, setInputState, toggleEditing],
  );
  return (
    <StoryThemePicker>
      <div style={{ display: 'grid', gridTemplateColumns: editing ? '1fr 1fr' : '1fr', gridGap: 10 }}>
        {editing && (
          <Editor
            onUpdate={setInputState}
            onCancel={cancelEditing}
            onSave={saveState}
            contact={inputState}
          />
        )}
        <Preview contact={editing ? inputState : state} onEdit={toggleEditing} />
      </div>
    </StoryThemePicker>
  );
};

const FlippableEditor = (props) => {
  const context = useFlippableProvider();
  const [state, setState] = useState(makeContact());
  const [inputState, setInputState] = useState(state);
  const saveState = useCallback(
    () => {
      setState(inputState);
      context.setter();
    },
    [inputState, setState, context],
  );
  const cancelEditing = useCallback(
    () => {
      setInputState(state);
      context.setter();
    },
    [state, setInputState, context],
  );
  return (
    <FlipContext.Provider value={context}>
      <StoryThemePicker>
        <Flippable
          autoFrontFace
          autoBackFace
          frontFace={
            <Preview contact={state} onEdit={context.setter} />
          }
          backFace={(
            <Editor
              onUpdate={setInputState}
              onCancel={cancelEditing}
              onSave={saveState}
              contact={inputState}
            />
          )}
          {...props}
        />
      </StoryThemePicker>
    </FlipContext.Provider>
  );
};

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
  )).add('Preview Demo', () => (
    <Layout>
      <SideBySide />
    </Layout>
  )).add('Toggle Demo', () => (
    <Layout>
      <ToggleEditor />
    </Layout>
  ))
  .add('Fade Demo', () => (
    <Layout>
      <FlippableEditor naked simple />
    </Layout>
  ))
  .add('Flip Demo', () => (
    <Layout>
      <FlippableEditor naked />
    </Layout>
  ))
  .add('Flip Paper Demo', () => (
    <Layout>
      <FlippableEditor />
    </Layout>
  ))
  .add('Fade Paper Demo', () => (
    <Layout>
      <FlippableEditor simple />
    </Layout>
  ));
