// @flow

import React from 'react';
import { useSubscription, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import Contact from '../contact';

import {
  Wrapper,
  List,
  LoadingWrapper,
  LoadingProgress,
  LoadingText,
} from './style';

// $FlowFixMe
// import { Contacts, ContactsSubscription } from '../../graphql/contacts.graphql';
// console.log(ContactsSubscription);

const Contacts = gql`
  query Contacts {
    contacts {
      id
      name
      username
      phone
      avatar
      cover
    }
  }
`;

const ContactsSubscription = gql`
  subscription ContactsSubscription {
    contact(
      where: { mutation_in: UPDATED }
    ) {
      node {
        id
        name
        username
        phone
        avatar
        cover
      }
    }
  }
`;

export const ContactsList = () => {
  const { data, error, loading } = useQuery(Contacts);
  useSubscription(ContactsSubscription);
  if (loading) {
    return (
      <LoadingWrapper>
        <LoadingProgress />
        <LoadingText>Loading...</LoadingText>
      </LoadingWrapper>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  const { contacts } = data;
  return (
    <Wrapper>
      <List amount={contacts.length} columns={3}>
        {contacts.map(({ id, ...rest }) => (
          <Contact key={id} contact={{ id, ...rest }} />
        ))}
      </List>
    </Wrapper>
  );
};

export default ContactsList;
