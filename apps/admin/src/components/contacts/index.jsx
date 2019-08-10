// @flow

import React from 'react';
import { useSubscription, useQuery } from '@apollo/react-hooks';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { css } from 'linaria';

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

const animationDuration = 1;
const rawAnimations = {
  neutral: css`
    transition: all ${animationDuration}s ease-out;
    transform: none !important;
    opacity: 1;
  `,
  appearIn: css`
    transform: translateY(150px) !important;
    opacity: 0;
  `,
  fadeOut: css`
    transition: all ${animationDuration}s ease-out;
    opacity: 0;
  `,
};
const animations = {
  enter: rawAnimations.appearIn,
  enterActive: rawAnimations.neutral,
  enterDone: rawAnimations.neutral,
  appear: rawAnimations.appearIn,
  appearActive: rawAnimations.neutral,
  appearDone: rawAnimations.neutral,
  exit: rawAnimations.neutral,
  exitActive: rawAnimations.fadeOut,
  exitDone: rawAnimations.fadeOut,
};

console.log(animations);

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
        <TransitionGroup component={null}>
          {contacts.map(({ id, ...rest }) => (
            <CSSTransition
              classNames={{ ...animations }}
              timeout={animationDuration * 1000}
              key={id}
            >
              <Contact contact={{ id, ...rest }} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </List>
    </Wrapper>
  );
};

export default ContactsList;
