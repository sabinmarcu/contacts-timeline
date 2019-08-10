import React, {
  useCallback, useEffect,
} from 'react';
import {
  Flippable, FlipContext, useFlippableProvider,
} from '@ct/ui';
import { Preview, Editor } from '@ct/contacts';
import { useMutation } from '@apollo/react-hooks';

import { useFlow } from './useFlow';
import {
  AlertDialog,
  ProgressDialog,
  StatusDialog,
} from './modals';

// $FlowFixMe
import UpdateContact from '../../graphql/contacts/update.gql';
// $FlowFixMe
import RemoveContact from '../../graphql/contacts/remove.gql';

export const ContactEditor = ({ contact }) => {
  const context = useFlippableProvider();
  const {
    Steps,
    step,
    setStep,
    prevStep,
    nextStep,
  } = useFlow([
    'default',
    'confirm',
    'progress',
    'success',
    'error',
  ]);
  const [updateContact] = useMutation(UpdateContact);
  const [removeContact, { loading, error }] = useMutation(RemoveContact);
  const { setter: toggleSide } = context;
  const saveContact = useCallback(
    (data) => {
      const updateObject = { ...contact, ...data };
      updateContact({ optimisticResponse: updateObject, variables: updateObject });
      toggleSide();
    },
    [toggleSide, updateContact, contact],
  );
  const removeHandler = useCallback(
    () => {
      removeContact({
        variables: { id: contact.id },
        update: () => setStep(Steps.success),
      });
    },
    [removeContact, setStep, Steps, contact],
  );
  useEffect(
    () => {
      let timeout = null;
      switch (step) {
        case Steps.success:
        case Steps.error:
          console.log('Setting timeout', step);
          timeout = setTimeout(setStep, 2000, Steps.default);
          break;
        default: break;
      }
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    },
    [step, setStep, Steps],
  );
  useEffect(
    () => {
      if (loading) {
        setStep(Steps.progress);
      }
    },
    [loading],
  );
  useEffect(
    () => {
      if (error) {
        setStep(Steps.error);
      }
    },
    [error],
  );
  return (
    <>
      <FlipContext.Provider value={context}>
        <Flippable
          autoSize
          // autoFaces
          // simple
          naked
          frontFace={(
            <Preview
              contact={contact}
              onEdit={toggleSide}
              onRemove={nextStep}
            />
          )}
          backFace={(
            <Editor
              onCancel={toggleSide}
              onSave={saveContact}
              contact={contact}
            />
          )}
        />
      </FlipContext.Provider>
      <AlertDialog
        contact={contact}
        open={step === Steps.confirm}
        onClose={prevStep}
        onConfirm={removeHandler}
      />
      <ProgressDialog
        open={step === Steps.progress}
      />
      <StatusDialog
        open={[Steps.success, Steps.error].includes(step)}
        success={step !== Steps.error}
      />
    </>
  );
};

export default ContactEditor;
