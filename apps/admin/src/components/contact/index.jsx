import React, {
  useCallback,
} from 'react';
import {
  Flippable, FlipContext, useFlippableProvider,
} from '@ct/ui';
import { Preview, Editor } from '@ct/contacts';
import { useMutation } from '@apollo/react-hooks';
import {
  useTheme,
} from '@material-ui/styles';
import { useFlow } from './useFlow';
import { AlertDialog } from './modals';

// $FlowFixMe
import UpdateContact from '../../graphql/contacts/update.gql';
// $FlowFixMe
import RemoveContact from '../../graphql/contacts/remove.gql';

export const ContactEditor = ({ contact }) => {
  const context = useFlippableProvider();
  const {
    Steps,
    step,
    // setStep,
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
  const [removeContact] = useMutation(RemoveContact);
  const { setter: toggleSide } = context;
  const theme = useTheme();
  const saveContact = useCallback(
    (data) => {
      const updateObject = { ...contact, ...data };
      updateContact({ optimisticResponse: updateObject, variables: updateObject });
      toggleSide();
    },
    [toggleSide, updateContact, contact],
  );
  const removeContactHandle = useCallback(
    async () => {
    //   swal.queue([{
    //     title: contact.name,
    //     text: `Are you sure you want to remove this contact?`,
    //     confirmButtonText: "Yes",
    //     cancelButtonText: "No",
    //     focusCancel: true,
    //     showCancelButton: true,
    //     showLoaderOnConfirm: true,
    //     confirmButtonColor: theme.palette.primary.main,
    //     cancelButtonColor: theme.palette.secondary.main,
    //     imageUrl: contact.avatar,
    //     preConfirm: () => new Promise((accept, reject) => {
    //         removeContact({
    //           variables: { id: contact.id },
    //           update: accept,
    //         });
    //       }).then((data) => {
    //         swal.insertQueueStep({
    //           timer: 2000,
    //           type: 'success',
    //           title: contact.name,
    //           text: 'Contact removed successfully'
    //         });
    //       }).catch(() => {
    //         swal.insertQueueStep({
    //           type: 'error',
    //           title: 'An error has occurred!'
    //         });
    //       })
    //   }]);
    },
    [removeContact, contact, theme],
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
        onConfirm={nextStep}
      />
    </>
  );
};

export default ContactEditor;
