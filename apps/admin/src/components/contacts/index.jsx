// @flow

import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import Contact from '../contact';

import {
  Wrapper,
  List,
  LoadingWrapper,
  LoadingProgress,
  LoadingText,
} from './style';

// $FlowFixMe
import ContactsQuery from '../../graphql/contacts.graphql';

export const ContactsList = () => {
  const { data, loading, error } = useQuery(ContactsQuery);
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
  return (
    <Wrapper>
      <List amount={data.contacts.length} columns={3}>
        {data.contacts.map(({ id, ...rest }) => (
          <Contact contact={{ id, ...rest }} />
        ))}
      </List>
    </Wrapper>
  );
};

export default ContactsList;
