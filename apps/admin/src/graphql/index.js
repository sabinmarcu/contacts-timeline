// @flow

import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const uri = '://localhost:4466';
const gqlUri = `http${uri}`;
const wsUri = `ws${uri}`;

const httpLink = new HttpLink({ uri: gqlUri });
const wsClient = new SubscriptionClient(wsUri, { reconnect: true });
const wsLink = new WebSocketLink(wsClient);

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([terminatingLink]);

const makeDataId = (({ __typename, id }) => id ? `${__typename}:${id}` : null);
const cache = new InMemoryCache({
  dataIdFromObject: ({ __typename, id, node }) => {
    let returnId = null;
    if (__typename.includes('Subscription')) {
      returnId = makeDataId(node);
    } else {
      returnId = makeDataId({ __typename, id });
    }
    console.log(returnId);
    return returnId;
  }
})

export const client = new ApolloClient({
  link,
  cache,
});

export default client;