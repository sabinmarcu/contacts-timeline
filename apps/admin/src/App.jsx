import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { ApolloProvider } from 'react-apollo-hooks';

import { Navigation } from '@ct/layout';
import { client } from './graphql';

import { ContactsRoute } from './routes/home';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Navigation style={{ flex: 0 }} />
        <ContactsRoute />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
