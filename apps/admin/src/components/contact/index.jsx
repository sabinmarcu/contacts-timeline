import React, {
  useCallback,
} from 'react';
import {
  Flippable, FlipContext, useFlippableProvider,
} from '@ct/ui';
import { Preview, Editor } from '@ct/contacts';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const Mutate = gql`
  mutation UpdateContact(
    $id: ID!
    $username: String!
    $phone: String!
    $name: String!
    $avatar: String!
    $cover: String!
  ) {
    updateContact(
      where: { id: $id }
      data: {
        username: $username 
        phone: $phone 
        name: $name 
        avatar: $avatar 
        cover: $cover 
      }
    ) {
      id 
      username 
      phone 
      name 
      avatar 
      cover 
    }
  }
`;

const Remove = gql`
  mutation RemoveContact(
    $id: ID!
  ) {
    removeContact(
      where: { id: $id }
    ) {
      id
    }
  }
`;

export const ContactEditor = ({ contact }) => {
  const context = useFlippableProvider();
  const [updateContact] = useMutation(Mutate);
  const { setter: toggleSide } = context;
  const saveContact = useCallback(
    (data) => {
      const updateObject = { ...contact, ...data };
      updateContact({ optimisticResponse: updateObject, variables: updateObject });
      toggleSide();
    },
    [toggleSide, updateContact, contact],
  );
  return (
    <FlipContext.Provider value={context}>
      <Flippable
        autoSize
        // autoFaces
        // simple
        naked
        frontFace={<Preview contact={contact} onEdit={toggleSide} />}
        backFace={(
          <Editor
            onCancel={toggleSide}
            onSave={saveContact}
            contact={contact}
          />
        )}
      />
    </FlipContext.Provider>
  );
};

export default ContactEditor;
