import React, {
  useState, useCallback,
} from 'react';
import {
  Flippable, FlipContext, useFlippableProvider,
} from '@ct/ui';
import { Preview, Editor } from '@ct/contacts';

export const ContactEditor = ({ contact }) => {
  const context = useFlippableProvider();
  const { setter: toggleSide } = context;
  const [state, setState] = useState(contact);
  const [inputState, setInputState] = useState(state);
  const saveState = useCallback(
    () => {
      setState(inputState);
      toggleSide();
    },
    [inputState, setState, toggleSide],
  );
  const cancelEditing = useCallback(
    () => {
      setInputState(state);
      toggleSide();
    },
    [state, setInputState, toggleSide],
  );
  return (
    <FlipContext.Provider value={context}>
      <Flippable
        autoSize
        // autoFaces
        // simple
        naked
        frontFace={
          <Preview contact={state} onEdit={toggleSide} />
        }
        backFace={(
          <Editor
            onUpdate={setInputState}
            onCancel={cancelEditing}
            onSave={saveState}
            contact={inputState}
          />
        )}
      />
    </FlipContext.Provider>
  );
};

export default ContactEditor;
