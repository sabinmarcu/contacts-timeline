// @flow

import React from 'react';
import { useSubscription, useQuery } from '@apollo/react-hooks';

import Contact from '../contact';

import {
  Wrapper,
  List,
  LoadingWrapper,
  LoadingProgress,
  LoadingText,
} from './style';

// $FlowFixMe
import Contacts from '../../graphql/contacts/list.gql';
// $FlowFixMe
import ContactsSubscription from '../../graphql/contacts/subscription.gql';

export const ContactsList = () => {
  const { data, error, loading } = useQuery(Contacts);
  useSubscription(ContactsSubscription, {
    onSubscriptionData: ({
      client,
      subscriptionData: {
        data: {
          contact: {
            mutation,
            node: contact,
            previousValues,
          },
        },
      },
    }) => {
      const previousQuery = client.readQuery({ query: Contacts });
      let update = null;
      switch (mutation) {
        case 'DELETED':
          update = previousQuery.contacts.filter(
            ({ id }) => id !== previousValues.id,
          );
          break;
        case 'CREATED':
          update = [
            contact,
            ...previousQuery.contacts,
          ];
          break;
        default: break;
      }
      if (update) {
        client.writeQuery({
          query: Contacts,
          data: { contacts: update },
        });
      }
    },
  });
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
